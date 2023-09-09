/*
import {
    ActionsType,
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC,
    TodoListDomainType,
    todoListsReducer
} from "../features/TodolistsList/todolists-reducer";

// Test the todoListsReducer
describe('todoListsReducer', () => {
    const initialState: TodoListDomainType[] = []
    it('should return the initial state', () => {
        const action = {} as ActionsType;
        const newState = todoListsReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    it('should handle SET-TODOLISTS action', () => {
        const todoLists: TodoListDomainType[] = [
            {
                id: '1',
                addedDate: "",
                order: 0,
                title: "List 1", filter: 'all'
            },
            {
                id: '2',
                addedDate: "",
                order: 0,
                title: "List 2", filter: 'all'
            },
        ];
        const action = setTodoListsAC(todoLists);
        const newState = todoListsReducer(initialState, action);

        expect(newState).toEqual(todoLists);
    });

    it('should handle REMOVE-TODOLIST action', () => {
        const todoListId = '1';
        const initialStateWithList: TodoListDomainType[] = [
            {
                id: '1',
                addedDate: "",
                order: 0,
                title: "List 1", filter: 'all'
            },
            {
                id: '2',
                addedDate: "",
                order: 0,
                title: "List 2", filter: 'all'
            },
        ];
        const action = removeTodoListAC(todoListId);
        const newState = todoListsReducer(initialStateWithList, action);

        expect(newState).not.toContainEqual({id: todoListId});
    });

    it('should handle ADD-TODOLIST action', () => {
        const todoList: TodoListDomainType = {
            id: '3',
            addedDate: "",
            order: 0,
            title: "New List", filter: 'all'
        };
        const action = addTodoListAC(todoList);
        const newState = todoListsReducer(initialState, action);

        expect(newState).toContainEqual(todoList);
    });

});
*/

export {}
