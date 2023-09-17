import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    const err = data.messages[0]

    if (err) {
        dispatch(setAppErrorAC(err))
    } else {
        dispatch(setAppErrorAC('Some error'))
    }
    dispatch(setAppStatusAC("failed"))

}

export const handleServerNetwotkError = (error:{message: string} , dispatch: Dispatch<ErrorUtilsDispatchType>) => {
    dispatch(setAppStatusAC("failed"))
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occured"))
}

type ErrorUtilsDispatchType = SetAppStatusActionType | SetAppErrorActionType