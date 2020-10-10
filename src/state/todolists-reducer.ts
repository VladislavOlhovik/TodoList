import { v1 } from "uuid";
import { filtersValueType, TodolistType } from "../Todolist";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id:string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id:string
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
            return state.filter(tl=>tl.id!=action.id)
        case 'ADD-TODOLIST':
            return[...state,{id:v1(), title:action.title, filter:"all"}]
        case 'CHANGE-TODOLIST-TITLE':{
            const newState = state.map(tl=>{
                if(tl.id === action.id){
                    return {...tl, title: action.title}
                }
                return tl
            })
            return newState
        }
        case 'CHANGE-TODOLIST-FILTER':{
            const newState = state.map(tl=>{
                if(tl.id === action.id){
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
    return { type: 'REMOVE-TODOLIST', id: todolistId}
 }
 export const AddTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return { type:"ADD-TODOLIST", title:newTodolistTitle}
 }
 export const ChangeTodolistTitleAC = (todolistId:string,newTodolistTitle:string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newTodolistTitle}
 }
 export const RemveTodolistAC = (todolistId: string,newFilter:filtersValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newFilter}
 }
 