import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../state/store";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "../state/tasks-reducer";
import {todoListsReducer} from "../state/todolists-reducer";
import {v1} from "uuid";

const rootReducer = combineReducers({
    task: tasksReducer,
    todoLists: todoListsReducer
})

const initialGlobalState = {
    todoLists: [{id: "todoListsId_1", title: "What to learn", filter: "all"},
        {id: "todoListsId_2", title: "What to buy", filter: "all"}
    ],
    tasks: {
        ["todoListsId_1"]: [
            {id: v1(), title: "HTML & CSS", isDone: true},
            {id: v1(), title: "ES6 & TS", isDone: true},
            {id: v1(), title: "React & Redux", isDone: false},
        ],
        ["todoListsId_2"]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "Bred", isDone: true},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType);
export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}