import {Dispatch} from "redux";
import {authApi} from "../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {AuthActionsType, setLogin} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'


const initialState: InitialStateType = {
    status: 'succeeded',
    error: null,
    initialized: false

}

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}

        case 'APP/SET-ERROR':
            return {...state, error: action.error}

        case 'APP/SET-INITIALISED':
            return {...state, initialized: action.value}

        default:
            return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setInitialisedAC = (value: boolean) => ({type: 'APP/SET-INITIALISED', value} as const)


export type SetStatusACType = ReturnType<typeof setAppStatusAC>;
export type SetErrorACType = ReturnType<typeof setAppErrorAC>;
export type setInitialisedACType = ReturnType<typeof setInitialisedAC>;
type AppActionsType =
    | SetStatusACType
    | SetErrorACType
    | setInitialisedACType;

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
    initialized: boolean
}

export const InitializedTC = () => {
    return (dispatch: Dispatch<AuthActionsType | setInitialisedACType | SetStatusACType | SetErrorACType>) => {
        dispatch(setAppStatusAC("loading"))
        authApi.authMe().then((res) => {
            dispatch(setInitialisedAC(true))
            if (res.data.resultCode === 0) {
                dispatch(setLogin(true))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        }).catch(error => {

            handleServerNetworkError(error, dispatch)
        });
    }
}
