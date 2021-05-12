import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    removeTodolistTC,
    setTodolistTC,
    TodolistDomainType
} from "../state/todolists-reducer";
import {FilterValuesType, TasksStateType} from "./App";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../state/tasks-reducer";
import {TaskStatuses} from "../api/todolist-api";
import {Container, Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {Redirect} from "react-router-dom";

type TodoListListType = {
    demo?: boolean
}

export const TodoListList = (props: TodoListListType) => {


    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const authorized = useSelector<AppRootStateType, boolean>(state => state.auth.authorized)
    const dispatch = useDispatch()


    useEffect(() => {
        debugger
        if (props.demo||!authorized) {
            return
        }
        dispatch(setTodolistTC())
    }, [])



    const removeTask = useCallback(function (id: string, todolistId: string) {
        // const action = removeTaskAC(id, todolistId);
        // dispatch(action);
        dispatch(removeTaskTC(todolistId, id))
    }, []);

    const addTask = useCallback(function (title: string, todolistId: string) {
        dispatch(addTaskTC(title, todolistId));
    }, []);

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskTC(todolistId, id, {status});
        dispatch(action);
    }, []);

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const action = updateTaskTC(todolistId, id, {title: newTitle});
        dispatch(action);
    }, []);

    const changeFilter = useCallback(function (value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatch(action);
    }, []);

    const removeTodolist = useCallback(function (id: string) {
        const action = removeTodolistTC(id);
        dispatch(action);
    }, []);

    const changeTodolistTitle = useCallback(function (id: string, title: string) {
        const action = changeTodolistTitleTC(id, title);
        dispatch(action);
    }, []);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistTC(title);
        dispatch(action);
    }, []);

    if (!authorized) {
        return <Redirect to={"/login"}/>
    }
    return <>

        <Container fixed>
            <Grid container style={{padding: "20px"}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Container fixed>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];

                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        todolist={tl}
                                        tasks={allTodolistTasks}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                        demo={props.demo}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </Container>
    </>
}

