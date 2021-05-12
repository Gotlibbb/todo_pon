import {FilterValuesType} from '../components/App';
import {todoApi, TodolistTypeApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppErrorAC, setAppStatusAC, SetErrorACType, SetStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistTypeApi
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type TodolistActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistActionType
    | ReturnType<typeof setTodolistStatusAC>

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {

        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id != action.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: "idle"}
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {

            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl);



        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.id? {...tl, filter: action.filter}: tl );

        }
        case 'SET-TODOLISTS': {
            return action.todolist.map(tl => ({
                ...tl,
                filter: 'all',
                entityStatus: "idle",

            }))
        }

        case 'SET-TD-STATUS': {
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.status} : tl)
        }

        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistTypeApi): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}

export const setTodolistAC = (todolist: TodolistTypeApi[]) => {
    return {type: 'SET-TODOLISTS', todolist} as const
}

export const setTodolistStatusAC = (status: RequestStatusType, id: string) => ({
    type: 'SET-TD-STATUS',
    status,
    id
} as const)


export type SetTodolistActionType = ReturnType<typeof setTodolistAC>

export const setTodolistTC = () => {
    return (dispatch: DispatchActionType) => {
        debugger
        dispatch(setAppStatusAC("loading"))

        todoApi.getTodos().then((res) => {
            debugger
            dispatch(setTodolistAC(res.data))
            dispatch(setAppStatusAC("succeeded"))
        }).catch(error => {
            handleServerNetworkError(error,dispatch)
        });

    }
}
export const removeTodolistTC = (todolistId: string) => {

    return (dispatch: DispatchActionType) => {
        dispatch(setAppStatusAC("loading"))
        dispatch(setTodolistStatusAC("loading", todolistId))
        todoApi.deleteTodos(todolistId).then((res) => {
            dispatch(setAppStatusAC("succeeded"))
            dispatch(removeTodolistAC(todolistId))
        }).catch(error => {
            handleServerNetworkError(error,dispatch)
        });
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: DispatchActionType) => {
        dispatch(setAppStatusAC("loading"))
        todoApi.postTodos(title).then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            handleServerNetworkError(error,dispatch)
        });
    }
}
export const changeTodolistTitleTC = (id: string, title: string) => {
    return (dispatch: DispatchActionType) => {
        dispatch(setAppStatusAC("loading"))
        todoApi.putTodos(title, id).then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(id, title))
                dispatch(setAppStatusAC("succeeded"))
            } else {

                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            handleServerNetworkError(error,dispatch)
        });
    }
}

export type TodolistDomainType = TodolistTypeApi & {

    filter: FilterValuesType
    entityStatus: RequestStatusType

}

export type DispatchActionType =Dispatch<TodolistActionsType | SetErrorACType | SetStatusACType>
