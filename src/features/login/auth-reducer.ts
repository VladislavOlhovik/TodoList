import { setLoginNameAC, SetLoginNameType, SetInitialazedType, setInitialazedAC } from './../../app/app-reducer';
import { handleServerAppError, handleServerNetworkError } from './../../utils/error-utils';
import { authAPI, LoginParamsType } from './../../api/todolist-api';
import { Dispatch } from 'redux'
import { SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../../app/app-reducer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
   isLoggedIn: false
}

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        setIsLoggedInAC(state, action: PayloadAction<{value: boolean}>){
            state.isLoggedIn = action.payload.value
        }
    }
})

export const authReducer = slice.reducer

// actions
export const {setIsLoggedInAC} = slice.actions

// thunks
export const loginTC = (data: LoginParamsType) => async (dispatch: DispatchType) => {
        dispatch(setInitialazedAC({isInitialazed:false}))
    try {
        let res = await authAPI.login(data)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value:true}))
            let data = await authAPI.me()
            dispatch(setLoginNameAC({login:data.data.data.login}))
            dispatch(setInitialazedAC({isInitialazed:true}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}
export const logoutTC = () => async (dispatch: DispatchType) => {
    dispatch(setAppStatusAC({status:'loading'}))
    try {
        let res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setLoginNameAC({login:'you are not logged in'}))
            dispatch(setIsLoggedInAC({value:false}))
            dispatch(setAppStatusAC({status:'succeeded'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error) {
        handleServerNetworkError(error, dispatch)
    }
}

// types
export type SetIsLoggedInType = ReturnType<typeof setIsLoggedInAC>
type DispatchType = Dispatch<
| SetIsLoggedInType 
| SetAppStatusType 
| SetAppErrorType 
| SetInitialazedType 
| SetLoginNameType>

