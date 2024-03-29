import axios, {AxiosResponse} from "axios";
import {LoginDataType} from "../features/Login/Login";


const instance = axios.create(
    {
        baseURL: "https://social-network.samuraijs.com/api/1.1/",
        withCredentials: true,
        headers: {
            "API-KEY": "ae177dec-2b8d-47ab-9ea4-bd7ef07c857c"
        }
    })

export const authAPI = {
    me() {
        return instance.get<ResponseType<UserType>, AxiosResponse<ResponseType<UserType>>>("auth/me")
    },
    login(loginData: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{userId: number}>>, LoginDataType>("auth/login", loginData)
    },
    logOut() {
        return instance.delete<ResponseType>("auth/login")
    }
}


export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>, AxiosResponse<ResponseType<{ item: TodoListType }>>, {title: string}>("todo-lists", {title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)

    },
    updateTodoListTitle(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    },
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todoListId}/tasks`, {title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todoListId}/tasks/${taskId}`)

    },
    updateTask(todoListId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todoListId}/tasks/${taskId}`, model);
    }

}

export type TasksStateType = {
    [todoListsId: string]: TaskType[]
}


export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<T = {}> = {  //по дефолту будет брать пустой объект
    resultCode: number
    messages: string[],
    fieldsErrors: string[],
    data: T
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    later = 4
}

export enum RESULT_CODE {
    SUCCESS=0,
    FAILED=1,
    CAPTCHA=10
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string

}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}

type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

type UserType = {
    id: number,
    email: string
    login: string
}






