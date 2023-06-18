import {TasksStateType} from "../AppWithReducers";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT} from "./todolists-reducer";
import {TaskType} from "../TodoList";

export type RemoveTaskAT = ReturnType<typeof RemoveTaskAC>

export type AddTaskAT = ReturnType<typeof AddTaskAC>

export type ChangeTaskStatusAT = ReturnType<typeof ChangeTaskStatusAC>

export type ChangeTaskTitleAT = ReturnType<typeof ChangeTaskTitleAC>

export type ActionsType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT |  ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT

const initialState: TasksStateType = {

}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK":{
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                isDone: false
            }
            const tasks = stateCopy[action.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS":{
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
            }
        case "CHANGE-TASK-TITLE": {
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy;
        }
        default:
            return state
    }
}

export const RemoveTaskAC = (taskId: string, todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId}) as const

export const AddTaskAC = (title: string, todoListId: string) => ({type: "ADD-TASK", title, todoListId

}) as const

export const ChangeTaskStatusAC = (taskId: string, isDone: boolean, todoListId: string) => ({type: "CHANGE-TASK-STATUS", taskId, isDone, todoListId
}) as const

export const ChangeTaskTitleAC = (taskId: string, title:string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId, title, todoListId
}) as const

