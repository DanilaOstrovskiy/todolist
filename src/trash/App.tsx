import React, {useState} from 'react';
import './App.css';
import TodoList from "../features/TodolistsList/Todolist/TodoList";
import {v1} from "uuid";
import AddItemForm from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {FilterValuesType, TodoListDomainType} from "../features/TodolistsList/todolists-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";


type TasksStateType = {
    [todoListsId: string]: TaskType[]
}


function App(): JSX.Element {
    //BLL:
    const todoListsId_1 = v1()
    const todoListsId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListDomainType[]>([
        {
            id: todoListsId_1,
            title: "What to learn",
            filter: "all",
            addedDate: ' ',
            order: 0,
            entityStatus: "idle"
        },
        {
            id: todoListsId_2,
            title: "What to buy",
            filter: "all",
            addedDate: '',
            order: 0,
            entityStatus: "idle"
        }
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const removeTask = (taskId: string, todoListId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        })
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todoListId,
            description: "",
            startDate: "",
            deadline: "",
            addedDate: "",
            order: 0,
            priority: TaskPriorities.Low
        }
        const tasksForUpdate = tasks[todoListId]
        const updatedTasks = [newTask, ...tasksForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = updatedTasks
        setTasks(copyTasks)

        setTasks({...tasks, [todoListId]: [newTask, ...tasksForUpdate]})
    }
    const changeTaskStatus = (taskId: string, status: TaskStatuses, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, status: status } : t)})
    }
    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    }
    const changeTodoListFilter = (todoListId: string, filter: FilterValuesType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        const copyTasks = {...tasks}
        delete copyTasks[todoListId]
        setTasks(copyTasks)
        //delete tasks[todoListId]
    }
    const addTodoList = (title: string) => {
        const newTodoListId = v1()
        const newTodoList: TodoListDomainType = {
            id: newTodoListId,
            title: title,
            filter: 'all',
            addedDate: "",
            order: 0,
            entityStatus: "idle"

        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoListId]: []})
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


    const todoListsComponents = todoLists.map(tl => {
        const filteredTasks: TaskType[] = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid item>
                <Paper sx={{p: "20px"}} elevation={8}>
                    <TodoList
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        tasks={filteredTasks}
                        filter={tl.filter}
                        entityStatus={tl.entityStatus}

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
    );
}

export default App;
