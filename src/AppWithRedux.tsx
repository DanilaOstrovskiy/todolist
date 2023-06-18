import React, {useCallback, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./TodoList";
import AddItemForm from "./AddItemForm";
import {
    AppBar,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup,
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
    ChangeTodoListTitleAC,
    RemoveTodoListAC
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


// CRUD
// R - filter, sort, search

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [todoListsId: string]: Array<TaskType>
}

type TodoListsStateType = Array<TodoListType>


function AppWithRedux(): JSX.Element {
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    //BLL:
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        const action = RemoveTaskAC(taskId, todoListId)
        dispatch(action);

    },[])

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = AddTaskAC(title, todoListId)
        dispatch(action);
    },[])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean, todoListId: string) => {
        const action = ChangeTaskStatusAC(taskId, isDone, todoListId)
        dispatch(action);

    },[])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = ChangeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action);
    },[])

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        const action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action);
    },[])

    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        const action = ChangeTodoListFilterAC(todoListId, filter)
        dispatch(action);
    },[])

    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action);
    },[])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action);
    }, []);

    const getFilteredTasks = (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case "active":
                return tasks.filter(t => t.isDone === false)
            case "completed":
                return tasks.filter(t => t.isDone === true)
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

export default AppWithRedux;
