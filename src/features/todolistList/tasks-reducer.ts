import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppRootStateType } from '../../app/store';
import { Dispatch } from 'redux';
import { TaskType, todolistAPI, UpdateTaskModelType, UpdateModelType } from '../../api/todolist-api';
import { RemoveTodolistActionType, SetTodolistsActionType, AddTodolistActionType, AddTodolistAC, SetTodolistAC, RemoveTodolistAC } from './todolists-reducer';
import { TasksStateType } from '../../app/App';
import { RequestStatusType, SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

const initialState: TasksStateType = {}

const slice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC: (state, action: PayloadAction<{ taskId: string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t=>t.id===action.payload.taskId)
            delete tasks[index]
            // { ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId) }
        },
        addTaskAC: (state, action: PayloadAction<{ task: TaskType }>) => {
            state[action.payload.task.todoListId].push({...action.payload.task, entityStatus: 'idle'})
        },
        updateTaskAC: (state, action: PayloadAction<{ taskId: string, updateModel: UpdateModelType, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t=>t.id===action.payload.taskId)
            tasks[index] = {...tasks[index], ...action.payload.updateModel}
        },
        setTaskAC: (state, action: PayloadAction<{ tasks:TaskType[], todolistId: string }>) => {
            state[action.payload.todolistId] = action.payload.tasks.map(t=>({...t, entityStatus: 'idle'}))
        },
        changeTaskEntityStatusAC: (state, action: PayloadAction<{ entityStatus: RequestStatusType, taskId:string, todolistId: string }>) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(t=>t.id===action.payload.taskId)
            tasks[index].entityStatus = action.payload.entityStatus
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AddTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(SetTodolistAC, (state, action) => {
            action.payload.todolists.forEach(tl => {
                state[tl.id] = []
            })
        });
        builder.addCase(RemoveTodolistAC, (state, action) => {
            delete state[action.payload.todolistId]
        });
    }
})

export const tasksReducer = slice.reducer

// action
export const { removeTaskAC, addTaskAC, updateTaskAC, 
    setTaskAC, changeTaskEntityStatusAC } = slice.actions
// thunk
export const fetchTasks = (todolistId: string) => async (dispatch: DispatchTaskType) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        let res = await todolistAPI.getTasksTodolist(todolistId)
        let tasks = res.data.items.reverse()
        dispatch(setTaskAC({tasks, todolistId}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: DispatchTaskType) => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTaskEntityStatusAC({entityStatus:'loading', taskId, todolistId}))
    try {
        let res = await todolistAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC({taskId, todolistId}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTask = (title: string, todolistId: string) => async (dispatch: DispatchTaskType) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        let res = await todolistAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC({task:res.data.data.item}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTask = (taskId: string, updateModel: UpdateModelType, todolistId: string) =>
    async (dispatch: DispatchTaskType, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC({status:'loading'}))
        dispatch(changeTaskEntityStatusAC({entityStatus:'loading', taskId, todolistId}))
        const task = getState().tasks1[todolistId].find(t => t.id === taskId)
        if (task) {
            let model: UpdateTaskModelType = {
                title: task.title,
                description: task.description,
                status: task.status,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                ...updateModel
            }
            try {
                let res = await todolistAPI.updateTask(todolistId, taskId, model)
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({taskId, updateModel, todolistId}))
                    dispatch(setAppStatusAC({status:'succeeded'}))
                    dispatch(changeTaskEntityStatusAC({entityStatus:'succeeded', taskId, todolistId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatusAC({entityStatus:'failed', taskId, todolistId}))
                }
            } catch (error) {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC({entityStatus:'failed', taskId, todolistId}))
            }
        }
    }
// types
type ActionType = 
| ReturnType<typeof removeTaskAC>
| ReturnType<typeof addTaskAC>
| ReturnType<typeof updateTaskAC>
| ReturnType<typeof setTaskAC>
| ReturnType<typeof changeTaskEntityStatusAC>
| AddTodolistActionType
| RemoveTodolistActionType
| SetTodolistsActionType

type DispatchTaskType = Dispatch<ActionType | SetAppStatusType | SetAppErrorType>