import React, {useCallback, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
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
    FilterValuesType,
    RemoveTodoListAC, TodoListDomainType
} from "./state/todolists-reducer";
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType} from "./api/api";


export type TasksStateType = {
    [todoListsId: string]: TaskType[]
}



function AppWithRedux(): JSX.Element {
    const todoLists = useSelector<AppRootStateType,TodoListDomainType[] >(state => state.todoLists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();

    //BLL:
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const removeTask = useCallback((taskId: string, todoListId: string) => {
        const action = RemoveTaskAC(taskId, todoListId)
        dispatch(action);

    },[dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        const action = AddTaskAC(title, todoListId)
        dispatch(action);
    },[dispatch])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        const action = ChangeTaskStatusAC(taskId, status, todoListId)
        dispatch(action);

    },[dispatch])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = ChangeTaskTitleAC(taskId, newTitle, todoListId)
        dispatch(action);
    },[dispatch])

    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        const action = ChangeTodoListTitleAC(title, todoListId)
        dispatch(action);
    },[dispatch])

    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        const action = ChangeTodoListFilterAC(todoListId, filter)
        dispatch(action);
    },[dispatch])

    const removeTodoList = useCallback((todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatch(action);
    },[dispatch])

    const addTodoList = useCallback((title: string) => {
        const action = AddTodoListAC(title)
        dispatch(action);
    }, [dispatch]);


    const mode = isDarkMode ? "dark" : "light"
    const newTheme = createTheme({
        palette: {
            mode: mode,
            primary: lightGreen,
            secondary: orange
        }
    })

    const todoListsComponents = todoLists.map(tl => {
        let allTodoListsTasks = tasks[tl.id]
        let tasksForTodolist = allTodoListsTasks

        return (
            <Grid item>
                <Paper sx={{p: "20px"}} elevation={8}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
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
