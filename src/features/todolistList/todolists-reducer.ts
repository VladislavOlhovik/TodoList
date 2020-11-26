import { todolistAPI } from '../../api/todolist-api';
import { TodolistType } from '../../api/todolist-api';
import { Dispatch } from 'redux';

export const todolistsReducer = (state:Array<TodolistDomainType> = [], action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id!==action.todolistId)
        case 'ADD-TODOLIST':
            return[{ ...action.todolist, filter:"all"},...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId?{...tl, title: action.title}:tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId?{...tl, filter:action.filter}:tl)
        case 'SET_TODOLISTS':
            return action.todolists.map(tl=>({...tl,filter:'all'}))
        default:
            return state
    }
 }
//action
export const RemoveTodolistAC = (todolistId: string) => 
    ({ type: 'REMOVE-TODOLIST', todolistId } as const)
export const AddTodolistAC = (todolist: TodolistType) => 
    ({ type: "ADD-TODOLIST", todolist } as const)
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => 
    ({ type: 'CHANGE-TODOLIST-TITLE', todolistId, title } as const )
export const ChangeTodolistFilterAC = (todolistId: string, filter: filtersValueType) => 
    ({ type: 'CHANGE-TODOLIST-FILTER', todolistId, filter } as const)
export const SetTodolistAC = (todolists: TodolistType[]) => 
    ({ type: 'SET_TODOLISTS', todolists } as const)

//thunks
export const fetchTodolists = () => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.getTodolists().then(res=>{
        dispatch(SetTodolistAC(res.data))
      })
}
export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.deleteTodolist(todolistId).then(res=>{
        dispatch(RemoveTodolistAC(todolistId))
      })
}
export const createTodolist = (title: string) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.createTodolist(title).then(res=>{
        dispatch(AddTodolistAC(res.data.data.item))
      })
}
export const updateTodolist = ( todolistId:string, title:string ) => (dispatch: Dispatch<ActionType>) => {
    todolistAPI.updateTodolistTitle( todolistId, title ).then(res=>{
        dispatch(ChangeTodolistTitleAC( todolistId, title ))
      })
}
// types
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof SetTodolistAC>

type ActionType = 
| RemoveTodolistActionType
| AddTodolistActionType
| SetTodolistsActionType
| ReturnType<typeof ChangeTodolistTitleAC>
| ReturnType<typeof ChangeTodolistFilterAC>

export type filtersValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: filtersValueType
}