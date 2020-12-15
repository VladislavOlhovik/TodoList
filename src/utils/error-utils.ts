import { Dispatch } from 'redux';
import  { ResponseType } from '../api/todolist-api'
import { setAppErrorAC, SetAppErrorType, setAppStatusAC, SetAppStatusType } from '../app/app-reducer';


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if(data.messages.length){
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some ERROR'}))
    }
    dispatch(setAppStatusAC({status:'failed'}))
}

export const handleServerNetworkError = (error:{message:string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppStatusAC({status:'failed'}))
    dispatch(setAppErrorAC({error: error.message?error.message:'Some error'}))
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>