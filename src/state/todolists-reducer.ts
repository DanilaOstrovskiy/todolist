
import {v1} from "uuid";
import {TodoListType} from "../api/api";

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST"
    id: string
}

export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    title: string
    todolistId: string
}

export type ChangeTodoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValuesType
}

export type ActionsType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

const initialState: TodoListDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

export const todoListsReducer = (state: TodoListDomainType[] = initialState, action: ActionsType): TodoListDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [ {
                id: action.todolistId,
                title: action.title,
                filter: "all",
                addedDate: '',
                order: 0
            }, ...state,]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default:
            return state
    }
}

export const RemoveTodoListAC = (todoListId: string): RemoveTodoListAT => ({type: "REMOVE-TODOLIST", id: todoListId })

export const AddTodoListAC = (title: string,): AddTodoListAT => ({type: "ADD-TODOLIST", title, todolistId: v1()})

export const ChangeTodoListTitleAC = (todoListId: string, title: string): ChangeTodoListTitleAT => ({
    type: "CHANGE-TODOLIST-TITLE",
    id: todoListId,
    title: title
})
export const ChangeTodoListFilterAC = (todoListId: string, filter: FilterValuesType): ChangeTodoListFilterAT => ({
    type: "CHANGE-TODOLIST-FILTER",
    id: todoListId,
    filter: filter
})
