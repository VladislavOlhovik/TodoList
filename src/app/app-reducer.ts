import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { setIsLoggedInAC, SetIsLoggedInType } from './../features/login/auth-reducer';
import { handleServerAppError, handleServerNetworkError } from './../utils/error-utils';
import { authAPI } from './../api/todolist-api';
import { Dispatch } from 'redux';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialazed: false,
    login: 'you are not logged in',
}

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setAppStatusAC(state, action: PayloadAction<{status:RequestStatusType}>){
            state.status = action.payload.status
        },
        setAppErrorAC(state, action: PayloadAction<{error: string|null}>){
            state.error = action.payload.error
        },
        setInitialazedAC(state, action: PayloadAction<{isInitialazed: boolean}>){
            state.isInitialazed = action.payload.isInitialazed
        },
        setLoginNameAC(state, action: PayloadAction<{login: string}>){
            state.login = action.payload.login
        },
    }
})

export const appReducer = slice.reducer

// actions
export const { setAppStatusAC, setAppErrorAC, setInitialazedAC, setLoginNameAC } = slice.actions

// thunks
export const initialazedTC = () => async (dispatch: DispatchType) => {
    try {
        let res = await authAPI.me()
        dispatch(setInitialazedAC({ isInitialazed: true }))
        if(res.data.resultCode === 0){
            dispatch(setLoginNameAC({ login:res.data.data.login }))
            dispatch(setIsLoggedInAC({ value:true }))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

//types
export type SetAppStatusType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorType = ReturnType<typeof setAppErrorAC>
export type SetInitialazedType = ReturnType<typeof setInitialazedAC>
export type SetLoginNameType = ReturnType<typeof setLoginNameAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
       status: RequestStatusType
       error: string|null
       isInitialazed: boolean
       login: string
    }
type DispatchType = Dispatch<SetInitialazedType | SetAppStatusType | SetAppErrorType | SetIsLoggedInType | SetLoginNameType>
