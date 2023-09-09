import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data:ResponseType<T>) => {
    const err = data.messages[0]

    if (err) {
        dispatch(setAppErrorAC(err))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC("failed"))

}

export const handleServerNetwotkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
    dispatch(setAppStatusAC("failed"))
    dispatch(setAppErrorAC(error))
}

type ErrorUtilsDispatchType = SetAppStatusACType | SetAppErrorACType