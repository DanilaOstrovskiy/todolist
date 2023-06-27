import React from 'react'
import {Task} from "./Task";
import {action} from "@storybook/addon-actions";


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
            task={{id:"1", isDone: true, title: "CSS"}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"todolistId1"}
            />
        <Task
            task={{id:"2", isDone: false, title: "HTML"}}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            todolistId={"todolistId2"}
            />
    </>
}
