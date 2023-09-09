import React, {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    FilterValuesType,
    fetchTodoListsTC,
    removeTodoListTC,
    TodoListDomainType
} from "./todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TasksStateType, TaskStatuses} from "../../api/todolists-api";
import {Grid, Paper} from "@mui/material";
import AddItemForm from "../../components/AddItemForm/AddItemForm";
import TodoList from "./Todolist/TodoList";


export const TodoListsList: React.FC = () => {

    const todoLists = useAppSelector<TodoListDomainType[]>(state => state.todoLists)
    const tasks = useAppSelector<TasksStateType>(state => state.tasks)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodoListsTC())
    }, [])

    const removeTask = useCallback((todoListId: string, taskId: string) => {
        dispatch(deleteTaskTC(taskId, todoListId))
    }, [])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(todoListId, title));
    }, [])

    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todoListId: string) => {
        dispatch(updateTaskTC(taskId, {status: status}, todoListId));

    }, [])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        const action = updateTaskTC(taskId, {title: newTitle}, todoListId)
        dispatch(action);
    }, [])


    const changeTodoListTitle = useCallback((title: string, todoListId: string) => {
        dispatch(changeTodoListTitleTC(title, todoListId))
    }, [])

    const changeTodoListFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        const action = changeTodoListFilterAC(todoListId, filter)
        dispatch(action);
    }, [])

    const removeTodoList = useCallback((todoListId: string) => {
        dispatch(removeTodoListTC(todoListId))
    }, [])

    const addTodoList = useCallback((title: string) => {
        dispatch(addTodoListTC(title))
    }, []);


    return (
        <div>
            <Grid container sx={{p: "10px 0"}}>
                <AddItemForm maxLengthUserMessage={15} addNewItem={addTodoList}/>
            </Grid>
            <Grid container spacing={3}>
                {todoLists.map((tl) => {
                    let allTodoListsTasks = tasks[tl.id];
                    let tasksForTodolist = allTodoListsTasks;
                    return (
                        <Grid item key={tl.id}>
                            <Paper sx={{p: "20px"}} elevation={8}>
                                <TodoList
                                    key={tl.id}
                                    todoListId={tl.id}
                                    title={tl.title}
                                    entityStatus = {tl.entityStatus}
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
                    );
                })}
            </Grid>
        </div>
    );

}