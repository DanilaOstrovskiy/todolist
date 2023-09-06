import React, {useEffect, useState} from 'react'
import {ToDoListAPI} from "../api/api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoListAPI.getTodoLists().then((res)=>{
            setState(res.data)
        })


    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoListAPI.createTodoList()
            .then((res) => {
            setState(res.data)
        })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "04a48a63-97d2-4ca7-8c13-2fe6ee79d233"
        ToDoListAPI.deleteTodoList(todoListId)
            .then((res) => {
            setState(res.data)
        })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "de3b58bd-a542-490d-9564-a92b9bcf172b"
        const title = "My hobby"
        ToDoListAPI.updateTodoListTitle(todoListId, title)
            .then((res) => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "de3b58bd-a542-490d-9564-a92b9bcf172b"
        ToDoListAPI.getTasks(todoListId).then((res)=>{
            setState(res.data)
        })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}


export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "de3b58bd-a542-490d-9564-a92b9bcf172b"
        ToDoListAPI.createTask(todoListId, "Books")
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "de3b58bd-a542-490d-9564-a92b9bcf172b"
        const taskId = "87fa1b28-23bf-498a-b8de-1a520f7d5fc5"
        ToDoListAPI.deleteTask(todoListId,taskId)
            .then((res) => {
                setState(res.data)
            })

    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "de3b58bd-a542-490d-9564-a92b9bcf172b"
        const taskId = "874dd783-16db-4556-8f87-0e562014d749"
        const title = "Updated movie title"
        ToDoListAPI.updateTask(todoListId,taskId, {title})
            .then((res) => {
                    setState(res.data)
                }
            )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}




