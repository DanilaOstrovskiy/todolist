import {RESULT_CODE, todoListAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorACType,
    setAppStatusAC,
    SetAppStatusACType
} from "../../app/app-reducer";
import {handleServerNetwotkError} from "../../utils/error-utils";
import {AxiosError} from "axios";


export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todoLists.map((tl) => ({...tl, filter: 'all', entityStatus: "idle"}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [{...action.todoList, filter: "all", entityStatus: "idle"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl);
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl);
        }
        case "SET-ENTITY-STATUS": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, entityStatus: action.entityStatus} : tl)
        }
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string) => ({type: "REMOVE-TODOLIST", todoListId} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: "ADD-TODOLIST", todoList} as const)
export const changeTodoListTitleAC = (todoListId: string, title: string) => ({
    type: "CHANGE-TODOLIST-TITLE",
    todoListId,
    title
} as const)
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => ({
    type: "CHANGE-TODOLIST-FILTER",
    todoListId,
    filter
} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({type: "SET-TODOLISTS", todoLists} as const)
export const setTodoListsEntityStatusAC = (todoListId: string, entityStatus: RequestStatusType) => ({
    type: "SET-ENTITY-STATUS",
    todoListId,
    entityStatus
} as const)


export const fetchTodoListsTC = () => async (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    try {
        dispatch(setAppStatusAC("loading"));
        const res = await todoListAPI.getTodoLists();
        dispatch(setTodoListsAC(res.data));
        dispatch(setAppStatusAC("succeeded"));
    } catch (error) {
        // Handle the error here, e.g., dispatch an error action or log the error.
        const axiosError = error as AxiosError;
        handleServerNetwotkError(dispatch, axiosError.message)
        dispatch(setAppStatusAC("failed"));
    }
}

export const addTodoListTC = (title: string) => async (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    try {
        dispatch(setAppStatusAC("loading"));
        const res = await todoListAPI.createTodoList(title);
        dispatch(addTodoListAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
    } catch (error) {
        // Handle the error here, e.g., dispatch an error action or log the error.
        const axiosError = error as AxiosError;
        handleServerNetwotkError(dispatch, axiosError.message)
        dispatch(setAppStatusAC("failed"));
    }
}


export const removeTodoListTC = (todoListId: string) => async (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    try {
        dispatch(setAppStatusAC("loading"));
        dispatch(setTodoListsEntityStatusAC(todoListId, 'loading'));
        const res = await todoListAPI.deleteTodoList(todoListId);
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(removeTodoListAC(todoListId));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            const err = res.data.messages[0];
            if (err) {
                dispatch(setAppErrorAC(err));
            } else {
                dispatch(setAppErrorAC('Some error'));
            }
            dispatch(setAppStatusAC("failed"));
            dispatch(setTodoListsEntityStatusAC(todoListId, "failed"));
        }
    } catch (error) {
        // Handle the error here, e.g., dispatch an error action or log the error.
        const axiosError = error as AxiosError;
        handleServerNetwotkError(dispatch, axiosError.message)
        dispatch(setAppStatusAC("failed"));
        dispatch(setTodoListsEntityStatusAC(todoListId, "failed"));
    }
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => async (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    try {
        dispatch(setAppStatusAC("loading"));
        await todoListAPI.updateTodoListTitle(todoListId, title);
        dispatch(changeTodoListTitleAC(todoListId, title));
        dispatch(setAppStatusAC("succeeded"));
    } catch (error) {
        const axiosError = error as AxiosError;
        // Handle the error here, e.g., dispatch an error action or log the error.
        handleServerNetwotkError(dispatch, axiosError.message);
        dispatch(setAppStatusAC("failed"));
    }
}



export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type SetTodoListAT = ReturnType<typeof setTodoListsAC>


export type ActionsType = SetTodoListAT
    | RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsEntityStatusAC>
    | SetAppStatusACType
    | SetAppErrorACType


const initialState: TodoListDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}