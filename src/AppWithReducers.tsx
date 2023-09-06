import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button, Checkbox,
    Container,
    createTheme, CssBaseline, FormControlLabel, FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {lightGreen, orange} from "@mui/material/colors";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC, FilterValuesType,
    RemoveTodoListAC,
    todoListsReducer
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from "./state/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./api/api";

export type TasksStateType = {
    [todoListsId: string]: Array<TaskType>
}



function AppWithReducers(): JSX.Element {
    //BLL:
    const todoListsId_1 = v1()
    const todoListsId_2 = v1()

    const [todoLists, dispatchToTodolistsReducer] = useReducer(todoListsReducer, [
        {
            id: todoListsId_1,
            title: "What to learn",
            filter: "all",
            addedDate: ' ',
            order: 0
        },
        {
            id: todoListsId_2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0
        }
    ])

    const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListsId_1]: [
            {
                id: v1(),
                title: "HTML & CSS",
                status: TaskStatuses.Completed,
                todoListId: todoListsId_1,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "ES6 & TS",
                status: TaskStatuses.Completed,
                todoListId: todoListsId_1,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ],
        [todoListsId_2]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                todoListId: todoListsId_2,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            },
            {
                id: v1(),
                title: "Bred",
                status: TaskStatuses.Completed,
                todoListId: todoListsId_2,
                description: "",
                startDate: "",
                deadline: "",
                addedDate: "",
                order: 0,
                priority: TaskPriorities.Low
            }
        ]
    })

    //BLL:
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const removeTask = (taskId: string, todoListId: string) => {
        const action = RemoveTaskAC(taskId, todoListId)
        dispatchToTasksReducer(action);

    }

    const addTask = (title: string, todoListId: string) => {
        const action = AddTaskAC(title, todoListId)
        dispatchToTasksReducer(action);
    }

    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        const action = ChangeTaskStatusAC(taskId, status, todoListId)
        dispatchToTasksReducer(action);

    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        const action = ChangeTaskTitleAC(taskId, newTitle, todoListId)
        dispatchToTasksReducer(action);
    }


    const changeTodoListTitle = (title: string, todoListId: string) => {
        const action = ChangeTodoListTitleAC(title, todoListId)
        dispatchToTodolistsReducer(action);
    }
    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        const action = ChangeTodoListFilterAC(todoListId, filter)
        dispatchToTodolistsReducer(action);
    }
    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchToTasksReducer(action)
        dispatchToTodolistsReducer(action);
    }
    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchToTasksReducer(action);
        dispatchToTodolistsReducer(action);
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValuesType): TaskType[] => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.status === TaskStatuses.New)
            case "completed":
                return tasks.filter(t => t.status === TaskStatuses.Completed)
            default:
                return tasks
        }
    }


    const mode = isDarkMode ? "dark" : "light"
    const newTheme = createTheme({
        palette: {
            mode: mode,
            primary: lightGreen,
            secondary: orange
        }
    })

    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: Array<TaskType> = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper sx={{p: "20px"}} elevation={8}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}

                        removeTask={removeTask}
                        addTask={addTask}

                        changeTaskStatus={changeTaskStatus}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}

                        changeTodoListFilter={changeTodoListFilter}
                        removeTodoList={removeTodoList}
                    />
                </Paper>
            </Grid>
        )
    })

    //UI:
    return (
        <ThemeProvider theme={newTheme}>
            <CssBaseline />
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            TodoLists
                        </Typography>
                        <FormGroup>
                            <FormControlLabel
                                control={<Checkbox
                                    onChange={(e)=>setDarkMode(e.currentTarget.checked)} />}
                                label={isDarkMode ? "Light mode" : "Dark mode"}
                            />
                        </FormGroup>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: "10px 0"}}>
                        <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
                    </Grid>
                    <Grid container spacing={3}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </div>
       </ThemeProvider >
    );
}

export default AppWithReducers;
