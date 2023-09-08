import {v1} from "uuid";
import {todoListAPI, TodoListType} from "../../api/todolists-api";
import {Dispatch} from "redux";


export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS": {
            return action.todoLists.map((tl) => ({...tl, filter: 'all'}))
        }
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.todoListId)
        }
        case "ADD-TODOLIST": {
            return [{...action.todoList, filter: "all"}, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl);
        }
        case "CHANGE-TODOLIST-FILTER": {
           return state.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl);
        }
        default:
            return state
    }
}

export const removeTodoListAC = (todoListId: string) => ({type: "REMOVE-TODOLIST", todoListId} as const)
export const addTodoListAC = (todoList: TodoListType) => ({type: "ADD-TODOLIST", todoList} as const)
export const changeTodoListTitleAC = (todoListId: string, title: string) => ({type: "CHANGE-TODOLIST-TITLE", todoListId, title} as const)
export const changeTodoListFilterAC = (todoListId: string, filter: FilterValuesType) => ({type: "CHANGE-TODOLIST-FILTER", todoListId, filter} as const)
export const setTodoListsAC = (todoLists: TodoListType[]) => ({type: "SET-TODOLISTS", todoLists} as const)


export const getTodoListsTC = () => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.getTodoLists()
        .then((res) => {
            res.data
            dispatch(setTodoListsAC(res.data))
        })
}

export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
        })
}


export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
        todoListAPI.deleteTodoList(todoListId)
        .then((res) => {
            res.data
            dispatch(removeTodoListAC(todoListId))
        })
}

export const changeTodoListTitleTC = (todoListId: string, title: string) => (dispatch: Dispatch<ActionsType>, getState: any, extraArg: any) => {
    todoListAPI.updateTodoListTitle(todoListId,title)
        .then((res) => {
            dispatch(changeTodoListTitleAC(todoListId,title))
        })
}


export type AddTodoListAT = ReturnType<typeof addTodoListAC>
export type RemoveTodoListAT = ReturnType<typeof removeTodoListAC>
export type SetTodoListAT = ReturnType<typeof setTodoListsAC>


export type ActionsType = SetTodoListAT
    | RemoveTodoListAT
    | AddTodoListAT
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>


const initialState: TodoListDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}