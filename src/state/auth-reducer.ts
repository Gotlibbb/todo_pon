import {authApi, loginTypeApi} from "../api/todolist-api";
import {setAppStatusAC, SetErrorACType, SetStatusACType} from "./app-reducer";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setTodolistAC} from "./todolists-reducer";


export type AuthActionsType =
    | ReturnType<typeof setLogin>
    ;

const initialState = {
    authorized: false

}

export const authReducer = (state = initialState, action: AuthActionsType) => {
    switch (action.type) {
        case "login/LOGINIZATION":
            debugger
            return {
                ...state, authorized: action.authorized
            }

        default:
            return state;
    }
}

export const setLogin = (authorized: boolean) => {
    return {type: "login/LOGINIZATION", authorized} as const
}



export const LoginTC = (login: loginTypeApi) => {
    return (dispatch: Dispatch<AuthActionsType | SetStatusACType | SetErrorACType>) => {
        dispatch(setAppStatusAC("loading"))
        authApi.login(login).then((res) => {

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
export const LogoutTC = () => {
    return (dispatch: Dispatch<AuthActionsType | SetStatusACType | SetErrorACType>) => {
        dispatch(setAppStatusAC("loading"))
        authApi.logout().then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(setLogin(false))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        }).catch(error => {

            handleServerNetworkError(error, dispatch)
        });
    }
}


