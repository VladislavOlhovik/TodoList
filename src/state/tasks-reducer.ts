import { TaskStatuses, TaskPriorities } from './../api/todolist-api';
import { RemoveTodolistActionType } from './todolists-reducer';
import { AddTodolistActionType } from './todolists-reducer';
import { v1 } from 'uuid';
import { TasksStateType } from './../App';


export type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof changeTaskTitleAC>
    | AddTodolistActionType
    | RemoveTodolistActionType

let initState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return { ...state, [action.todolistId]: state[action.todolistId].filter(el => el.id !== action.taskId) }
        case 'ADD-TASK':
            return {
                ...state, [action.todolistId]: [...state[action.todolistId], {
                    id: v1(), title: action.title,
                    status: TaskStatuses.New, todoListId: action.todolistId, description: '',
                    startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
                },]
            }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? { ...el, status: action.status } : el)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(el => el.id === action.taskId ? { ...el, title: action.title } : el)
            }
        }
        case 'ADD-TODOLIST':
            return { ...state, [action.todolistId]: [] }
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
export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASK', title, todolistId } as const
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', status, todolistId, taskId } as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId } as const
} 