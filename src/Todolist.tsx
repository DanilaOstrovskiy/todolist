import React, {useCallback} from 'react';
import AddItemForm from "./AddItemForm";

import {Button, IconButton, Typography} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {Task} from "./Task";
import {FilterValuesType} from "./state/todolists-reducer";
import {TaskStatuses, TaskType} from "./api/api";
import {EditableSpan} from "./EditableSpan";



type TodoListPropsType = {
    todoListId: string
    title: string
    filter: FilterValuesType
    tasks: TaskType[]

    removeTask: (taskId: string, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todoListId: string) => void
    changeTaskTitle : (taskId: string, newTitle: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void

    changeTodoListFilter: (todoListId: string, filter: FilterValuesType) => void
    removeTodoList: (todoListId: string) => void
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
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return (
        <div className={"todolist"}>
            <Typography
            variant={"h5"}
            align={'center'}
            fontWeight={'bold'}
            gutterBottom={true}
            ><EditableSpan value={props.title} onChange={changeTodoListTitle}/>
                <IconButton
                    size={"small"}
                    onClick={removeTodoList}>
                    <HighlightOffIcon />
                </IconButton>
            </Typography>
            <AddItemForm maxLengthUserMessage={15} addNewItem={addTask}/>
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