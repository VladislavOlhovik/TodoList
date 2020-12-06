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

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        case 'APP/SET-INITIALAZED':
            return { ...state, isInitialazed: action.isInitialazed }
        case 'APP/SET-LOGINNAME':
            return { ...state, login: action.login }
       default:
            return state
    }
}

// actions
export const setAppStatusAC = (status:RequestStatusType) => ({type:'APP/SET-STATUS',status} as const)
export const setAppErrorAC = (error: string|null) => ({type:'APP/SET-ERROR',error} as const)
export const setInitialazedAC = (isInitialazed: boolean) => ({type:'APP/SET-INITIALAZED', isInitialazed} as const)
export const setLoginNameAC = ( login: string ) => ({type:'APP/SET-LOGINNAME',  login} as const)

// thunks
export const initialazedTC = () => async (dispatch: DispatchType) => {
    try {
        let res = await authAPI.me()
        dispatch(setInitialazedAC(true))
        if(res.data.resultCode === 0){
            dispatch(setLoginNameAC(res.data.data.login))
            dispatch(setIsLoggedInAC(true))
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
type ActionsType = 
    | SetAppStatusType
    | SetAppErrorType
    | SetInitialazedType
    | SetLoginNameType

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = {
       status: RequestStatusType
       error: string|null
       isInitialazed: boolean
       login: string
    }
type DispatchType = Dispatch<SetInitialazedType | SetAppStatusType | SetAppErrorType | SetIsLoggedInType | SetLoginNameType>
