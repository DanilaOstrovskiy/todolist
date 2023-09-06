import { TasksStateType } from "../AppWithReducers";
import { AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer } from "./tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../api/api";

const generateInitialState = (): TasksStateType => ({
    "todolistId1": [
        {
            id: "1", title: "CSS", status: TaskStatuses.Completed,
            todoListId: "todolistId1",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: "2", title: "JS", status: TaskStatuses.Completed,
            todoListId: "todolistId1",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: "3", title: "React", status: TaskStatuses.New,
            todoListId: "todolistId1",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        }
    ],
    "todolistId2": [
        {
            id: "1", title: "bread", status: TaskStatuses.New,
            todoListId: "todolistId2",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: "2", title: "milk", status: TaskStatuses.Completed,
            todoListId: "todolistId2",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        },
        {
            id: "3", title: "tea", status: TaskStatuses.New,
            todoListId: "todolistId2",
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        }
    ]
});

test('correct tasks should be removed from correct array', () => {
    const startState: TasksStateType = generateInitialState();
    const action = RemoveTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", isDone: false },
            { id: "2", title: "JS", isDone: true },
            { id: "3", title: "React", isDone: false }
        ],
        "todolistId2": [
            { id: "1", title: "bread", isDone: false },
            { id: "3", title: "tea", isDone: false }
        ]
    });
});

test('correct task should be added to correct array', () => {
    const startState: TasksStateType = generateInitialState();
    const action = AddTaskAC("juice", "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe('juice');
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    const startState: TasksStateType = generateInitialState();
    const action = ChangeTaskTitleAC("2", 'beer', "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].title).toBe('beer');
    expect(endState['todolistId1'][1].title).toBe("JS");
});

test('status of specified task should be changed', () => {
    const startState: TasksStateType = generateInitialState();
    const action = ChangeTaskStatusAC("2", TaskStatuses.New, "todolistId2");
    const endState = tasksReducer(startState, action);

    expect(endState['todolistId2'][1].status).toBe(TaskStatuses.Completed);
    expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
});
