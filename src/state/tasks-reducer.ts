import { RemoveTodolistActionType } from './todolists-reducer';
import { AddTodolistActionType } from './todolists-reducer';
import { v1 } from 'uuid';
import { TasksStateType } from './../App';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK' 
    todolistId:string 
    taskId:string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistId:string 
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskId:string
    isDone:boolean 
    todolistId:string
}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId:string 
    title:string 
    todolistId: string
}
export type ActionType = 
RemoveTaskActionType
|AddTaskActionType
|ChangeTaskStatusActionType
|ChangeTaskTitleActionType
|AddTodolistActionType
|RemoveTodolistActionType

 let initState:TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initState, action: ActionType):TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,[action.todolistId]:state[action.todolistId].filter(el=>el.id!==action.taskId)}
        case 'ADD-TASK':
            return {...state,[action.todolistId]:[...state[action.todolistId],{id:v1(),title:action.title,isDone:false}]}
        case 'CHANGE-TASK-STATUS':{
            // {...state,[action.todolistId]:state[action.todolistId].map(el=>el.id==action.taskId?el.isDone=action.isDone:el)}    
            const tasks = state[action.todolistId]
            const task = tasks.find(el=>el.id===action.taskId)
            if(task){
                task.isDone=action.isDone
            }
            return {...state, [action.todolistId]:tasks}
        }
        case 'CHANGE-TASK-TITLE':{
            const tasks = state[action.todolistId]
            const task = tasks.find(el=>el.id===action.taskId)
            if(task){
                task.title=action.title
            }
            return {...state, [action.todolistId]:tasks}
        }
        case 'ADD-TODOLIST':
            return {...state,[action.todolistId]:[]}
        case 'REMOVE-TODOLIST':
            const copyState = {...state}
            delete copyState[action.todolistId]
            return copyState
        default:
            return state
    }
 }
 export const removeTaskAC = (taskId:string, todolistId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todolistId, taskId}
 }
 export const addTaskAC = (title:string, todolistId: string): AddTaskActionType => {
    return { type:'ADD-TASK', title, todolistId}
 }
 export const changeTaskStatusAC = (taskId:string,isDone:boolean, todolistId:string): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', isDone, todolistId, taskId}
 }
 export const changeTaskTitleAC = (taskId:string, title:string, todolistId: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
 } 