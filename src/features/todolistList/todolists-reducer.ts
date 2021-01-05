import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todolistAPI } from '../../api/todolist-api';
import { TodolistType } from '../../api/todolist-api';
import { Dispatch } from 'redux';
import { RequestStatusType, SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from '../../utils/error-utils';

const initialState: Array<TodolistDomainType> = []

const slice = createSlice({
    name: 'todolists',
    initialState: initialState,
    reducers: {
        RemoveTodolistAC:(state, action: PayloadAction<{ todolistId: string }>)=>{
            const index = state.findIndex(tl=>tl.id===action.payload.todolistId)
            state.splice(index,1)
        },
        AddTodolistAC:(state, action: PayloadAction<{ todolist: TodolistType }>)=>{
            state.unshift({ ...action.payload.todolist, filter:"all", entityStatus: 'idle'})
        },
        ChangeTodolistTitleAC:(state, action: PayloadAction<{ todolistId: string, title: string }>)=>{
            const index = state.findIndex(tl=>tl.id===action.payload.todolistId)
            state[index].title = action.payload.title
        },
        ChangeTodolistFilterAC:(state, action: PayloadAction<{ todolistId: string, filter: filtersValueType }>)=>{
            const index = state.findIndex(tl=>tl.id===action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        SetTodolistAC:(state, action: PayloadAction<{ todolists: TodolistType[] }>)=>{
            return action.payload.todolists.map(tl=>({...tl, filter:'all', entityStatus: 'idle'}))
        },
        changeTodolistEntityStatusAC:(state, action: PayloadAction<{ entityStatus: RequestStatusType, todolistId:string }>)=>{
            const index = state.findIndex(tl=>tl.id===action.payload.todolistId)
            state[index].entityStatus = action.payload.entityStatus
        },
    }
})

export const todolistsReducer = slice.reducer
//action
export const { RemoveTodolistAC, AddTodolistAC, ChangeTodolistTitleAC, 
    ChangeTodolistFilterAC, SetTodolistAC, changeTodolistEntityStatusAC} = slice.actions
//thunks
export const fetchTodolists = () => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        let res = await todolistAPI.getTodolists()
        dispatch(SetTodolistAC({todolists:res.data}))
        dispatch(setAppStatusAC({status:'succeeded'}))
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const removeTodolistTC = (todolistId: string) => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    dispatch(changeTodolistEntityStatusAC({entityStatus:'loading', todolistId}))
    try {
        let res = await todolistAPI.deleteTodolist(todolistId)
        if (res.data.resultCode === 0) {
            dispatch(RemoveTodolistAC({todolistId}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const createTodolist = (title: string) => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        let res = await todolistAPI.createTodolist(title)
        if (res.data.resultCode === 0) {
            dispatch(AddTodolistAC({todolist:res.data.data.item}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const updateTodolist = (todolistId: string, title: string) => async (dispatch: Dispatch<DispatchTodolistType>) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        let res = await todolistAPI.updateTodolistTitle(todolistId, title)
        if (res.data.resultCode === 0) {
            dispatch(ChangeTodolistTitleAC({todolistId, title}))
            dispatch(setAppStatusAC({status:'succeeded'}))
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