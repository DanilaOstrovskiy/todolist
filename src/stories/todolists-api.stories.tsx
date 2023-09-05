import React, {useEffect, useState} from 'react'
import {ToDoListAPI} from "../api/api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        ToDoListAPI.getTodoList().then((res)=>{
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
        ToDoListAPI.updateTodoList(todoListId, title)
            .then((res) => {
                setState(res.data)
            }
        )
    }, [])

    return <div>{JSON.stringify(state)}</div>
}