import React from 'react'
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";
import {TaskPriorities, TaskStatuses} from "./api/api";


export default {
    title: "TaskComponent",
    component: Task
}

const changeTaskTitleCallback = action("Status changed")
const removeTaskCallback = action("Status changed")
const changeTaskStatusCallback = action("Status changed")

export const TaskBaseExample = () => {
    return <>
        <Task
            task={{id:"1", status: TaskStatuses.Completed, title: "CSS", addedDate: "",deadline:"",
            todoListId: "todoListsId_1", description:"",order:0, priority: TaskPriorities.Low, startDate:""}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"todolistId1"}
            />
        <Task
            task={{id:"2", status: TaskStatuses.New, title: "HTML", addedDate: "",deadline:"",
                todoListId: "", description:"",order:0, priority: TaskPriorities.Low, startDate:""}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"todoListsId_2"}
            />
    </>
}
