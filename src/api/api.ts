import axios from "axios";


const instance = axios.create(
    {
        baseURL: "https://social-network.samuraijs.com/api/1.1/",
        withCredentials: true,
    })

export const ToDoListAPI = {
    getTodoList() {
        return instance.get<TodoListType[]>("todo-lists")
    },
    createTodoList() {
        return instance.post<ResponseType<{item: TodoListType}>>("todo-lists", {title: "Dimych todolist"})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoListId}`)

    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoListId}`, {title})
    }

}

type TodoListType = {
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
