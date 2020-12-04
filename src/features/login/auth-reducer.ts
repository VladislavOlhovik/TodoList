import { handleServerAppError, handleServerNetworkError } from './../../utils/error-utils';
import { authAPI, LoginParamsType } from './../../api/todolist-api';
import { Dispatch } from 'redux'
import { SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../../app/app-reducer'

const initialState = {
   isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
       case 'login/SET-IS-LOGGED-IN':
           return {...state, isLoggedIn: action.value}
       default:
           return state
   }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
   ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const logoutTC = () => async (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(false))
            dispatch(setAppStatusAC('succeeded'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

// types
type ActionsType = SetIsLoggedInType
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type DispatchType = Dispatch<SetIsLoggedInType | SetAppStatusType | SetAppErrorType>
type InitialStateType = typeof initialState

