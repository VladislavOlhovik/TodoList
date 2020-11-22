import { todolistAPI } from './../api/todolist-api';
import { TodolistType } from '../api/todolist-api';
import { Dispatch } from 'redux';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    todolistId: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    todolist: TodolistType
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
export type SetTodolistsActionType = ReturnType<typeof SetTodolistAC>
export type ActionType = 
RemoveTodolistActionType
|AddTodolistActionType
|ChangeTodolistTitleActionType
|ChangeTodolistFilterActionType
|SetTodolistsActionType

export type filtersValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: filtersValueType
}

let initState:Array<TodolistDomainType> = []

export const todolistsReducer = (state:Array<TodolistDomainType> = initState, action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id!==action.todolistId)
        case 'ADD-TODOLIST':
            return[{ ...action.todolist, filter:"all"},...state]
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
        case 'SET_TODOLISTS':{
            return action.todolists.map(tl=>({...tl,filter:'all'}))      
        }
        default:
            return state
    }
 }
 export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST',  todolistId}
 }
 export const AddTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type:"ADD-TODOLIST", todolist}
 }
 export const ChangeTodolistTitleAC = (todolistId:string, title:string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', todolistId, title}
 }
 export const ChangeTodolistFilterAC = (todolistId: string, filter:filtersValueType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', todolistId, filter}
 }
export const SetTodolistAC = (todolists: TodolistType[]) => {
    return { type: 'SET_TODOLISTS', todolists } as const
}


export const fetchTodolists = () => (dispatch: Dispatch) => {
    todolistAPI.getTodolists().then(res=>{
        dispatch(SetTodolistAC(res.data))
      })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todolistId).then(res=>{
        dispatch(RemoveTodolistAC(todolistId))
      })
}
export const createTodolist = (title: string) => (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title).then(res=>{
        dispatch(AddTodolistAC(res.data.data.item))
      })
}
export const updateTodolist = ( todolistId:string, title:string ) => (dispatch: Dispatch) => {
    todolistAPI.updateTodolistTitle( todolistId, title ).then(res=>{
        dispatch(ChangeTodolistTitleAC( todolistId, title ))
      })
}
 