import axios, {AxiosResponse} from "axios";


const instance = axios.create(
    {
        baseURL: "https://social-network.samuraijs.com/api/1.1/",
        withCredentials: true,
    })

export const todoListAPI = {
    getTodoLists() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    createTodoList() {
        return instance.post<ResponseType<{ item: TodoListType }>>("todo-lists", {title: "Dimych todolist"})
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
        return instance.put<ResponseType<{item: TaskType}>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(` /todo-lists/${todoListId}/tasks/${taskId}`, model)

    }

}

export type TodoListType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {  //по дефолту будет брать пустой объект
    resultCode: number
    messages: [],
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

type GetTasksResponse = {
    items: TaskType[]
    totalCount: number
    error: string | null
}






