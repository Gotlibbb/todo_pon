import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "7356db4d-2dd5-4272-8da5-db03322fb687"
    }
})


export type TodolistTypeApi = {
    id: string
    addedDate: string
    order: number
    title: string
}

//загенерить типы
export type ApiResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

export enum TaskStatuses {
    New = 0,
    inProgress = 2,
    Completed = 3,
    Draft = 4,

}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,

}


export type TaskTypeApi = {
    description: string
    title: string
    id: string
    todoListId: string

    status: TaskStatuses
    priority: TaskPriorities
    deadline: string
    order: number
    startDate: string
    addedDate: string
}

export type ApiTaskType<T = {}> = {
    totalCount: number
    error: string | number
    items: TaskTypeApi[]
}

export type TaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}


export const todoApi = {
    getTodos() {
        return instance.get<Array<TodolistTypeApi>>('todo-lists')
    },
    postTodos(title: string) {
        return instance.post<ApiResponseType<{ item: TodolistTypeApi }>>('todo-lists', {title})
    },
    deleteTodos(todolistId: string) {
        return instance.delete<ApiResponseType>(`todo-lists/${todolistId}`)
    },
    putTodos(title: string, todolistId: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    },


    getTasks(todolistId: string) {
        return instance.get<ApiTaskType>(`todo-lists/${todolistId}/tasks`)
    },
    postTasks(title: string, todolistId: string) {
        return instance.post<ApiResponseType<{ item: TaskTypeApi }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTasks(todolistId: string, taskId: string) {
        return instance.delete<ApiResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },


    putTasks(todolistId: string, taskId: string, model: TaskModelType) {
        return instance.put<ApiResponseType<{ item: TaskTypeApi }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    },


}

export type loginTypeApi = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}

export type authMeAPI = {
    id: number
    email: string
    login: string
}
export const authApi = {
    login(login: loginTypeApi) {
        return instance.post<ApiResponseType<{ UserId: number }>>('auth/login', login )
    },
    logout() {
        return instance.delete<ApiResponseType>('auth/login' )
    },
    authMe() {
        return instance.get<ApiResponseType<authMeAPI>>('auth/me' )
    },

}