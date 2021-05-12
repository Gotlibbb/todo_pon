import React from 'react';

import {Dispatch} from "redux";
import {changeTodolistTitleAC, TodolistActionsType} from "../state/todolists-reducer";
import {setAppErrorAC, setAppStatusAC, SetErrorACType, SetStatusACType} from "../state/app-reducer";
import {addTaskAC, TaskActionsType} from "../state/tasks-reducer";
import {ApiResponseType, TaskTypeApi} from "../api/todolist-api";
import {AxiosResponse} from "axios";

export const handleServerAppError = <T>(data:ApiResponseType<T>, dispatch: Dispatch<SetErrorACType | SetStatusACType>  ) => {
        if (data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
            dispatch(setAppStatusAC("failed"))
        }
}
export const handleServerNetworkError = (error: any, dispatch: Dispatch<SetErrorACType | SetStatusACType>  ) => {

            dispatch(setAppErrorAC(error.message))
            dispatch(setAppStatusAC("failed"))

}