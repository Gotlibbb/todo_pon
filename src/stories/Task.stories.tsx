import React from 'react'
import {action} from '@storybook/addon-actions'
import {Task} from '../components/Task'
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Task Stories',
    component: Task
}

const removeCallback = action('Remove Button inside Task clicked');
const changeStatusCallback = action('Status changed inside Task');
const changeTitleCallback = action('Title changed inside Task');

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task
                task={{
                    id: '1', status: TaskStatuses.Completed,
                    title: "CSS",
                    priority: TaskPriorities.Low,
                    addedDate: "",
                    deadline: "",
                    description: "",
                    startDate: "",
                    todoListId: "",
                    order: 0
                }}
                removeTask={removeCallback}
                changeTaskTitle={changeTitleCallback}
                changeTaskStatus={changeStatusCallback}
                todolistId={"todolistId1"}
            />
            <Task
                task={{
                    id: '2', status: TaskStatuses.New,
                    title: "JS",
                    priority: TaskPriorities.Low,
                    addedDate: "",
                    deadline: "",
                    description: "",
                    startDate: "",
                    todoListId: "",
                    order: 0
                }}
                removeTask={removeCallback}
                changeTaskTitle={changeTitleCallback}
                changeTaskStatus={changeStatusCallback}
                todolistId={"todolistId2"}
            />
        </div>)
}
