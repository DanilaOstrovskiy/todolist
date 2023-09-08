import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType} from "../app/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../features/TodolistsList/tasks-reducer";
import {todoListsReducer} from "../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    task: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState: AppRootStateType = {
    todoLists: [
        { id: "todoListId_1", title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: "todoListId_2", title: "What to buy", filter: "all", addedDate: "", order: 0 }
    ],
    tasks: {
        ["todoListsId_1"]: [
            {id: v1(), title: "HTML & CSS", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                todoListId: "todoListsId_1", description: "", order:0, priority: TaskPriorities.Low, startDate: ""},
            {id: v1(), title: "React & Redux", status: TaskStatuses.New, addedDate: "", deadline: "",
                todoListId: "todoListsId_1", description: "", order:0, priority: TaskPriorities.Low, startDate: ""},
        ],
        ["todoListsId_2"]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, addedDate: "",deadline:"",
                todoListId: "todoListsId_2", description: "", order:0, priority: TaskPriorities.Low, startDate: ""},
            {id: v1(), title: "Bread", status: TaskStatuses.New, addedDate: "", deadline: "",
                todoListId: "todoListsId_2", description: "", order:0, priority: TaskPriorities.Low, startDate: ""},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState );
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}