import React, {ChangeEvent, useCallback} from 'react'
import {Checkbox, IconButton} from '@material-ui/core'
import {EditableSpan} from './EditableSpan'
import {Delete} from '@material-ui/icons'
import {TaskStatuses, TaskTypeApi} from "../api/todolist-api";

type TaskPropsType = {
    task: TaskTypeApi
    todolistId: string
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
}
export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props.task.id, props.todolistId]);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        let status = newIsDoneValue ?  TaskStatuses.Completed : TaskStatuses.New

        props.changeTaskStatus(props.task.id, status , props.todolistId)
    }, [props.task.id , props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    }, [props.task.id, props.todolistId]);

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
        <IconButton onClick={onClickHandler}>
            <Delete/>
        </IconButton>
    </div>
})
