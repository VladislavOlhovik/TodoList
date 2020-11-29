import { todolistAPI } from '../../api/todolist-api';
import { TodolistType } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { RequestStatusType, SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

export const todolistsReducer = (state:Array<TodolistDomainType> = [], action: ActionType):Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl=>tl.id!==action.todolistId)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return state.map(tl=>tl.id===action.todolistId?{...tl, entityStatus:action.entityStatus}:tl)
        case 'ADD-TODOLIST':
            return[{ ...action.todolist, filter:"all", entityStatus: 'idle'},...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.todolistId?{...tl, title: action.title}:tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.todolistId?{...tl, filter:action.filter}:tl)
        case 'SET_TODOLISTS':
            return action.todolists.map(tl=>({...tl, filter:'all', entityStatus: 'idle'}))
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
export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, todolistId:string) => 
    ({type:'CHANGE-TODOLIST-ENTITY-STATUS', entityStatus, todolistId} as const)
//thunks
export const fetchTodolists = () => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await todolistAPI.getTodolists()
        dispatch(SetTodolistAC(res.data))
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC('loading', todolistId))
    try {
        let res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(RemoveTodolistAC(todolistId))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTodolist = (title: string) => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(AddTodolistAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTodolist = (todolistId: string, title: string) => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await todolistAPI.updateTodolistTitle(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(ChangeTodolistTitleAC(todolistId, title))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
// types
export type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>
export type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof SetTodolistAC>
export type ChangeTodolistEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

type ActionType = 
| RemoveTodolistActionType
| AddTodolistActionType
| SetTodolistsActionType
| ReturnType<typeof ChangeTodolistTitleAC>
| ReturnType<typeof ChangeTodolistFilterAC>
| ChangeTodolistEntityStatusType

export type filtersValueType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
    filter: filtersValueType
    entityStatus: RequestStatusType
}
type DispatchTodolistType = ActionType|SetAppStatusType|SetAppErrorType