import { v1 } from "uuid";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    FilterValuesType,
    RemoveTodoListAC,
    TodoListDomainType,
    todoListsReducer,
} from "./todolists-reducer";

const generateInitialState = (): TodoListDomainType[] => {
    const todoListId1 = v1();
    const todoListId2 = v1();
    return [
        { id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
        { id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0 },
    ];
};

test('correct todolist should be removed', () => {
    const startState: TodoListDomainType[] = generateInitialState();
    const todoListId1 = startState[0].id;
    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(startState[1].id);
});

test('correct todolist should be added', () => {
    const startState: TodoListDomainType[] = generateInitialState();
    const newTodolistTitle = "New Todolist";
    const endState = todoListsReducer(startState, AddTodoListAC(newTodolistTitle));

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    const startState: TodoListDomainType[] = generateInitialState();
    const todolistId2 = startState[1].id;
    const newTodolistTitle = "New Todolist";
    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todolistId2, newTodolistTitle));

    expect(endState[0].title).toBe(startState[0].title);
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    const startState: TodoListDomainType[] = generateInitialState();
    const todolistId2 = startState[1].id;
    const newFilter: FilterValuesType = "completed";
    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todolistId2, newFilter));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
