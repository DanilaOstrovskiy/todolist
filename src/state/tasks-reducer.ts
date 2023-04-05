import {TasksStateType, TodolistType} from '../App';
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


type ActionsType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | changeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId) }
        case 'ADD-TASKS':
            return {...state,
                [action.payload.todolistId]: [{id: v1(), title: action.payload.title, isDone: false}]/*, ...state[action.payload.taskId]]*/
        }
        case "CHANGE-TASK-STATUS":
            return  {...state,[action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, isDone: action.payload.isDone}: task)

            }
        case "CHANGE-TITLE-TASK":
            return  {...state,[action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {...task, title: action.payload.title}: task)
            }
        case "ADD-TODOLIST":
            return  {...state,[action.todolistId]:[]
            }
        case "REMOVE-TODOLIST":
/*            const copyState = {...state}
            delete copyState[action.id]
            return copyState*/
            const {[action.id]:[], ...rest} = state
            return rest
        default:
            throw new Error("I don't understand this type")
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {
        type: 'REMOVE-TASK', payload: {taskId, todolistId}
    } as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return { type: 'ADD-TASKS', payload: {title, todolistId} } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {
        type: 'CHANGE-TASK-STATUS', payload: {taskId, isDone, todolistId} }  as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {
        type: 'CHANGE-TITLE-TASK', payload: {taskId, title, todolistId} }  as const
}





