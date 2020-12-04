import { setIsLoggedInAC, SetIsLoggedInType } from './../features/login/auth-reducer';
import { handleServerAppError, handleServerNetworkError } from './../utils/error-utils';
import { authAPI } from './../api/todolist-api';
import { Dispatch } from 'redux';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialazed: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INITIALAZED':
            return { ...state, isInitialazed: action.isInitialazed }
       default:
            return state
    }
}

// actions
export const setAppStatusAC = (status:RequestStatusType) => ({type:'APP/SET-STATUS',status} as const)
export const setAppErrorAC = (error: string|null) => ({type:'APP/SET-ERROR',error} as const)
export const setInitialazedAC = (isInitialazed: boolean) => ({type:'APP/SET-INITIALAZED', isInitialazed} as const)

// thunks
export const initialazedTC = () => async (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.me()
        dispatch(setInitialazedAC(true))
        if(res.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
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
type ActionsType = 
    | SetAppStatusType
    | SetAppErrorType
    | SetInitialazedType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
       status: RequestStatusType
       error: string|null
       isInitialazed: boolean
    }
type DispatchType = Dispatch<SetInitialazedType | SetAppStatusType | SetAppErrorType | SetIsLoggedInType>
