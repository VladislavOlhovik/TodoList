import { Dispatch } from 'redux';
import  { ResponseType } from '../api/todolist-api'
import { setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../app/app-reducer';


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if(data.messages.length){
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some ERROR'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error:{message:string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC('failed'))
    dispatch(setAppErrorAC(error.message))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>