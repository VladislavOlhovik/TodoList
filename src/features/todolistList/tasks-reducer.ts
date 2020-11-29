import { AppRootStateType } from '../../app/store';
import { Dispatch } from 'redux';
import { TaskType, todolistAPI, UpdateTaskModelType, UpdateModelType } from '../../api/todolist-api';
import { RemoveTodolistActionType, SetTodolistsActionType, AddTodolistActionType } from './todolists-reducer';
import { TasksStateType } from '../../app/App';
import { RequestStatusType, SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

export const tasksReducer = (state: TasksStateType = {}, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId) }
        case 'ADD-TASK':
            return { ...state, [action.task.todoListId]: [...state[action.task.todoListId], {...action.task, entityStatus: 'idle'}] }
        case 'UPDATE_TASK': 
            return {
                ...state, 
                [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? { ...el, ...action.updateModel } : el)
            }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolist.id]: [] }
        case 'CHANGE-TASK-ENTITY-STATUS':
            return { ...state, [action.todolistId]: state[action.todolistId]
                .map(t=>t.id===action.taskId?{...t, entityStatus: action.entityStatus}:t)}
        case 'SET_TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET_TASKS': 
            return {...state,[action.todolistId]:action.tasks.map(t=>({...t, entityStatus: 'idle'}))}
        case 'REMOVE-TODOLIST':
            const copyState = { ...state }
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}
// action
export const removeTaskAC = (taskId: string, todolistId: string) => 
    ({ type: 'REMOVE-TASK', todolistId, taskId } as const)
export const addTaskAC = (task: TaskType) => 
    ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, updateModel: UpdateModelType, todolistId: string) => 
    ({ type: 'UPDATE_TASK', updateModel, todolistId, taskId } as const)
export const setTaskAC = (tasks:TaskType[], todolistId: string) => 
    ({ type: 'SET_TASKS', tasks, todolistId } as const) 
export const changeTaskEntityStatusAC = (entityStatus: RequestStatusType, taskId:string, todolistId: string) => 
    ({type:'CHANGE-TASK-ENTITY-STATUS', entityStatus, taskId, todolistId} as const)
// thunk
export const fetchTasks = (todolistId: string) => async (dispatch: DispatchTaskType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await todolistAPI.getTasksTodolist(todolistId)
        let tasks = res.data.items.reverse()
        dispatch(setTaskAC(tasks, todolistId))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => async (dispatch: DispatchTaskType) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC('loading', taskId, todolistId))
    try {
        let res = await todolistAPI.deleteTask(todolistId, taskId)
        if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTask = (title: string, todolistId: string) => async (dispatch: DispatchTaskType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await todolistAPI.createTask(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTask = (taskId: string, updateModel: UpdateModelType, todolistId: string) =>
    async (dispatch: DispatchTaskType, getState: () => AppRootStateType) => {
        dispatch(setAppStatusAC('loading'))
        dispatch(changeTaskEntityStatusAC('loading', taskId, todolistId))
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
                    dispatch(updateTaskAC(taskId, updateModel, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                    dispatch(changeTaskEntityStatusAC('succeeded', taskId, todolistId))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTaskEntityStatusAC('failed', taskId, todolistId))
                }
            } catch (error) {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatusAC('failed', taskId, todolistId))
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