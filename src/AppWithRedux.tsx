import React, {useCallback, useEffect, useState} from 'react';
import './unused/App.css';
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
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    FilterValuesType,
    getTodoListsTC,
    removeTodoListTC,
    TodoListDomainType
} from "./state/todolists-reducer";
import {createTaskTC, deleteTaskTC, updateTaskTC} from "./state/tasks-reducer";
import {useAppDispatch, useAppSelector} from "./state/store";
import {TaskStatuses, TaskType} from "./api/todolists-api";


export type TasksStateType = {
    [todoListsId: string]: TaskType[]
}


function AppWithRedux(): JSX.Element {
    const [isDarkMode, setDarkMode] = useState<boolean>(false)

    const todoLists = useAppSelector<TodoListDomainType[] >(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getTodoListsTC())
    },[])

    const removeTask = useCallback(( todoListId: string, taskId: string) => {
        dispatch(deleteTaskTC(taskId, todoListId))
    },[])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(createTaskTC(todoListId, title));
    },[])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTaskTC(taskId,{status: status},todoListId));

    },[])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = updateTaskTC(taskId, {title: newTitle}, todoListId)
        dispatch(action);
    },[])


    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodoListTitleTC(title,todoListId))
    },[])

    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListId, filter)
        dispatch(action);
    },[])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    },[])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, []);


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
