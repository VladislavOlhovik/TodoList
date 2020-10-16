import { v1 } from "uuid";
import { filtersValueType, TodolistType } from "../Todolist";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId:string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    todolistId:string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    todolistId:string
    filter:filtersValueType
}
export type ActionType = 
RemoveTodolistActionType
|AddTodolistActionType
|ChangeTodolistTitleActionType
|ChangeTodolistFilterActionType
 

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType):Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id!==action.todolistId)
        case 'ADD-TODOLIST':
            return[...state,{id:action.todolistId, title:action.title, filter:"all"}]
        case 'CHANGE-TODOLIST-TITLE':{
            const newState = state.map(tl=>{
                if(tl.id === action.todolistId){
                    return {...tl, title: action.title}
                }
                return tl
            })
            return newState
        }
        case 'CHANGE-TODOLIST-FILTER':{
            const newState = state.map(tl=>{
                if(tl.id === action.todolistId){
                    return {...tl,filter:action.filter}
                }
                return tl
            })            
            return newState
        }
        defaule:
            throw new Error("I don't understand this type")
    }
 }
 export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST',  todolistId}
 }
 export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type:"ADD-TODOLIST", title, todolistId:v1()}
 }
 export const ChangeTodolistTitleAC = (todolistId:string, title:string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
 }
 export const RemveTodolistAC = (todolistId: string, filter:filtersValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
 }
 