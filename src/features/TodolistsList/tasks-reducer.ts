import {
    RESULT_CODE,
    TasksStateType,
    TaskType,
    todoListAPI,
    UpdateDomainTaskModelType,
    UpdateTaskModelType
} from "../../api/todolists-api";
import {Dispatch} from "redux";

import {AppRootStateType} from "../../app/store";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListAT} from "./todolists-reducer";
import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetwotkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "SET-TASKS": {
            return {...state, [action.todoListId]: action.tasks}
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todoLists.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id != action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.todoListId]: [action.task, ...state[action.todoListId]]}
        }
        case "UPDATE-TASK": {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId
                        ? {...t, ...action.model}
                        : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId
                        ? {...t, title: action.title}
                        : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todoList.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.todoListId]
            return stateCopy;
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId} as const)

export const addTaskAC = (task: TaskType, todoListId: string) => ({
    type: "ADD-TASK", task, todoListId
} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) => ({
    type: "UPDATE-TASK", taskId, model, todoListId
}) as const

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId, title, todoListId
}) as const

export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({type: "SET-TASKS", tasks, todoListId} as const)

export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    dispatch(setAppStatusAC("loading"))
    todoListAPI.getTasks(todoListId)
        .then((res) => {
            res.data
            dispatch(setTasksAC(res.data.items, todoListId))
            dispatch(setAppStatusAC("succeeded"))
        })
}


export const deleteTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.deleteTask(taskId, todoListId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoListId))
            dispatch(setAppStatusAC("succeeded"))
        })
}

export const addTaskTC = (todoListId: string, title: string) => async (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    dispatch(setAppStatusAC("loading"))

    try {
        const res = await todoListAPI.createTask(todoListId, title)
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
            dispatch(addTaskAC(res.data.data.item, todoListId))
            dispatch(setAppStatusAC("succeeded"))
        } else {
            handleServerAppError(dispatch, res.data)
        }
    } catch (error) {
        if (axios.isAxiosError<ErrorType>(error)) {
            const res = error.response?.data.messages.map((error) => error.field)
            handleServerNetwotkError(dispatch, error.message)
        } else {
            handleServerNetwotkError(dispatch, (error as Error).message)
        }
    }

}

type ErrorType = {
    "statusCode": 0.
    "messages": [
        {"message": "string",
        "field": "string"
        }
    ],
    "error": string
}


export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) =>
    (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType, extraArg: any) => {

        const task = getState().tasks[todoListId].find(t => t.id === taskId)
        if (task) {
            const apiModel: UpdateTaskModelType = {
                title: task.title,
                startDate: task.startDate,
                priority: task.priority,
                description: task.description,
                deadline: task.deadline,
                status: task.status,
                ...domainModel

            }
            todoListAPI.updateTask(todoListId, taskId, apiModel)

                .then((res) => {
                    if (res.data.resultCode === RESULT_CODE.SUCCESS) {
                        dispatch(updateTaskAC(taskId, domainModel, todoListId))
                        dispatch(setAppStatusAC("succeeded"))
                    } else {
                        const err = res.data.messages[0]
                        if (err) {
                            dispatch(setAppErrorAC(err))
                        } else {
                            dispatch(setAppErrorAC('Some error'))
                        }
                        dispatch(setAppStatusAC("failed"))
                    }
                }).catch((error: AxiosError<ErrorType>)  => {
                    error.response?.data
                //handleServerNetwotkError(dispatch, error.message)
            })
        }

    }


export type ActionsType =
    ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | SetAppStatusACType
    | SetAppErrorACType