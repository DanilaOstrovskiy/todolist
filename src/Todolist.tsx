import React, {ChangeEvent, FC, RefObject, useRef, useState, KeyboardEvent, useCallback} from 'react';
import TasksList from "./TasksList";
import {FilterValuesType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, IconButton, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Task} from "./Task";


type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle : (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean

}

const TodoList = React.memo( (props:TodoListPropsType) => {
    const addTask = useCallback((title: string) => {
            props.addTask(title, props.todoListId)
    }, [props.addTask, props.todoListId]);

    const handlerCreator = useCallback((filter: FilterValuesType) => () => props.changeTodoListFilter(props.todoListId, filter),[props.changeTodoListFilter, props.todoListId])
    const removeTodoList = () => props.removeTodoList(props.todoListId)
    const changeTodoListTitle = useCallback((title:string) => props.changeTodoListTitle(title, props.todoListId),[props.todoListId, props.changeTodoListTitle ])




    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true)
    }

    return (
        <div className={"todolist"}>
            <Typography
            variant={"h5"}
            align={'center'}
            fontWeight={'bold'}
            gutterBottom={true}
            ><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <IconButton
                    size={"small"}
                    onClick={removeTodoList}>
                    <HighlightOffIcon />
                </IconButton>
            </Typography>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
{/*            <TasksList
                filter={props.filter}
                changeTaskTitle={props.changeTaskTitle}
                todoListId={props.todoListId}
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskStatus={props.changeTaskStatus}
            />*/}
                <div>                {
                    tasksForTodolist.map(t => <Task
                        task={t}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.todoListId}
                        key={t.id}
                    />)
                }
                </div>

            <div className="filter-btn-container">
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="all" ? "secondary" : "primary"}
                    onClick={handlerCreator('all')}
                >All</Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="active" ? "secondary" : "primary"}
                    onClick={handlerCreator('active')}
                >Active</Button>
                <Button
                    size={'small'}
                    variant={'contained'}
                    disableElevation
                    color={props.filter ==="completed" ? "secondary" : "primary"}
                    onClick={handlerCreator("completed")}
                >Completed</Button>
            </div>
        </div>
    );
});

export default TodoList;