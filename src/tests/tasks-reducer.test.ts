import {TasksStateType, TaskType} from '../api/todolists-api';
import {ActionsType, addTaskAC, removeTaskAC, setTasksAC, tasksReducer} from "../features/TodolistsList/tasks-reducer";



// Test the tasksReducer
describe('tasksReducer', () => {
    const initialState: TasksStateType = {}
    it('should return the initial state', () => {
        const action = {} as ActionsType;
        const newState = tasksReducer(undefined, action);
        expect(newState).toEqual(initialState);
    });

    it('should handle SET-TASKS action', () => {
        const todoListId = '1';
        const tasks: TaskType[] = [{
            description: "",
            title: "New Task",
            status: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            id: "",
            todoListId: todoListId,
            order: 1,
            addedDate: "string"
        }];
        const action = setTasksAC(tasks, todoListId);
        const newState = tasksReducer(initialState, action);

        expect(newState).toEqual({[todoListId]: tasks});
    });

    it('should handle ADD-TASK action', () => {
        const state = {
            'todoListId1': [],
        };

        const task = {
            id: 'taskId1', title: 'Task 1',
            description: '',
            status: 0,
            priority: 0,
            startDate: "",
            deadline: "",
            todoListId: '',
            order: 0,
            addedDate: ""
        };
        const action = addTaskAC(task, 'todoListId1');
        const nextState = tasksReducer(state, action);

        expect(nextState).toEqual({'todoListId1': [task]});
    });

    it('should handle REMOVE-TASK action', () => {
        const todoListId = '1';
        const taskId = '2';
        const initialStateWithTask = {
            [todoListId]: [{
                description: "",
                title: "New Task",
                status: 0,
                priority: 0,
                startDate: "",
                deadline: "",
                id: taskId,
                todoListId: todoListId,
                order: 1,
                addedDate: "string"
            }]
        };
        const action = removeTaskAC(taskId, todoListId);
        const newState = tasksReducer(initialStateWithTask, action);

        expect(newState[todoListId]).toEqual([]);
    })
});

