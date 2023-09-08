import {TaskType, todoListAPI, UpdateTaskModelType} from "../../api/todolists-api";
import {Dispatch} from "redux";

import {AppRootStateType} from "../../app/store";
import {AddTodoListAT, RemoveTodoListAT, SetTodoListAT} from "./todolists-reducer";
import {TasksStateType} from "../../app/App";


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
            return {...state, [action.todoListId] : state[action.todoListId].filter(t => t.id != action.taskId)}
        }
        case "ADD-TASK": {
            return {...state, [action.todoListId]: [action.task, ...state[action.todoListId]]}
        }
        case "UPDATE-TASK": {
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId
                    ? {...t, ...action.model}
                    : t)}
            }
        case "CHANGE-TASK-TITLE": {
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t)}
        }
        case 'ADD-TODOLIST': {
            return  {...state, [action.todoList.id]: []}
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

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.getTasks(todoListId)
        .then((res) => {
            res.data
            dispatch(setTasksAC(res.data.items, todoListId))
        })
}

export const deleteTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.deleteTask(taskId, todoListId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoListId))
        })
}

export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.createTask(todoListId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item, todoListId))
        })
}

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
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
                dispatch(updateTaskAC(taskId, domainModel, todoListId))
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