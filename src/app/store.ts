import {AnyAction, applyMiddleware, combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import thunk, {ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";


const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>


export type ThunkType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = useDispatch<ThunkType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

//@ts-ignore
window.store = store;