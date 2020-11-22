import { AppRootStateType } from './store';
import { Dispatch } from 'redux';
import { TaskType, todolistAPI, UpdateTaskModelType, UpdateModelType } from './../api/todolist-api';
import { RemoveTodolistActionType, SetTodolistsActionType } from './todolists-reducer';
import { AddTodolistActionType } from './todolists-reducer';
import { TasksStateType } from './../App';


export type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof setTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType

let initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId) }
        case 'ADD-TASK':
            return {
                ...state, 
                [action.task.todoListId]: [...state[action.task.todoListId], action.task]
            }
        case 'UPDATE_TASK': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? { ...el, ...action.updateModel } : el)
            }
        }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolist.id]: [] }
        case 'SET_TODOLISTS': {
            const stateCopy = { ...state }
            action.todolists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'SET_TASKS': {
            return {...state,[action.todolistId]:action.tasks}
        }
        case 'REMOVE-TODOLIST':
            const copyState = { ...state }
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
}
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return { type: 'REMOVE-TASK', todolistId, taskId } as const
}
export const addTaskAC = (task: TaskType) => {
    return { type: 'ADD-TASK', task } as const
}
export const updateTaskAC = (taskId: string, updateModel: UpdateModelType, todolistId: string) => {
    return { type: 'UPDATE_TASK', updateModel, todolistId, taskId } as const
}
export const setTaskAC = (tasks:TaskType[], todolistId: string) => {
    return { type: 'SET_TASKS', tasks, todolistId } as const
} 

export const fetchTasks = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.getTasksTodolist(todolistId).then(res=>{
        let tasks = res.data.items.reverse()
        dispatch(setTaskAC(tasks, todolistId))
    })
}
export const removeTaskTC = (taskId:string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTask( todolistId, taskId).then(res=>{
        dispatch(removeTaskAC(taskId, todolistId))
    })
}
export const createTask = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.createTask(todolistId, title).then(res=>{
        dispatch(addTaskAC(res.data.data.item))
    })
}
export const updateTask = (taskId: string, updateModel:UpdateModelType, todolistId: string) => {
    return (dispatch: Dispatch, getState:()=>AppRootStateType) => {
    const task = getState().tasks1[todolistId].find(t=>t.id===taskId)
    if(task){
    let model: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        ...updateModel
    }
    todolistAPI.updateTask(todolistId, taskId, model).then(res=>{
        dispatch(updateTaskAC(taskId, updateModel, todolistId))
    })}
}}