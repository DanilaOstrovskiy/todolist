import {AddTodoListAT, RemoveTodoListAT, SetTodoListAT} from "./todolists-reducer";
import {TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {TasksStateType} from "../AppWithRedux";
import {AppRootStateType} from "./store";

export type RemoveTaskAT = ReturnType<typeof removeTaskAC>

export type AddTaskAT = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>

export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

export type ActionsType =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodoListAT
    | ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-TASKS": {
            return {
                ...state,
                [action.todoListId]: action.tasks
            }
        }
        case "SET-TODOS": {
            const stateCopy = {...state}
            action.todoLists.forEach((td) => {
                stateCopy[td.id] = []
            })
            return stateCopy
        }
        case "REMOVE-TASK": {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            return {
                ...state, [action.todoListId]: [action.task, ...state[action.todoListId]]
            }

        }
        case "CHANGE-TASK-STATUS": {
            let todolistTasks = state[action.todoListId];
            state[action.todoListId] = todolistTasks
                .map(t => t.id === action.taskId
                    ? {...t, status: action.status}
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

export const removeTaskAC = (taskId: string, todoListId: string) => ({type: "REMOVE-TASK", taskId, todoListId} as const)

export const addTaskAC = (task: TaskType, todoListId: string) => ({
    type: "ADD-TASK", task, todoListId
} as const)

export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todoListId: string) => ({
    type: "CHANGE-TASK-STATUS", taskId, status, todoListId
}) as const

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string) => ({
    type: "CHANGE-TASK-TITLE", taskId, title, todoListId
}) as const

export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({type: "SET-TASKS", tasks, todoListId} as const)

export const getTasksTC = (todoListId: string) => (dispatch: Dispatch, getState: any, extraArg: any) => {
    todoListAPI.getTasks(todoListId)
        .then((res) => {
            res.data
            dispatch(setTasksAC(res.data.items, todoListId))
        })
}

export const deleteTaskTC = (taskId: string, todoListId: string) => (dispatch: Dispatch, getState: any, extraArg: any) => {
    todoListAPI.deleteTask(taskId, todoListId)
        .then(() => {
            dispatch(removeTaskAC(taskId, todoListId))
        })
}

export const createTaskTC = (todoListId: string, title: string) => (dispatch: Dispatch, getState: any, extraArg: any) => {
    todoListAPI.createTask(todoListId, title)
        .then((res) => {
            dispatch(addTaskAC(res.data.data.item, todoListId))
        })
}

export const updateTaskTC = (taskId: string, todoListId: string,  status: TaskStatuses) => (dispatch: Dispatch, getState: () => AppRootStateType, extraArg: any) => {

    const task = getState().tasks[todoListId].find((t) => t.id === taskId)
    if (task) {
        const model: UpdateTaskModelType = {
            title: task?.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status
        }
        todoListAPI.updateTask(todoListId, taskId, model)
            .then((res) => {
                dispatch(changeTaskStatusAC(taskId, status, todoListId))
            })
    }

}
