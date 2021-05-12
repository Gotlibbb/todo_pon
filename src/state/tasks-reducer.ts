import {TasksStateType} from '../components/App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistActionType} from './todolists-reducer';
import {TaskModelType, TaskPriorities, TaskStatuses, TaskTypeApi, todoApi} from '../api/todolist-api';
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {setAppStatusAC, SetErrorACType, SetStatusACType} from "./app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskTypeApi
}


export type UpdateTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
    model: DomainUpdateTaskModelType
}

export type TaskActionsType = RemoveTaskActionType | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistActionType
    | SetTaskActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TaskActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            debugger
            const stateCopy = {...state}
            const newTask = action.task
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks]
            stateCopy[newTask.todoListId] = newTasks
            return stateCopy;

        }

        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            // найдём нужную таску:
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolist.forEach((tl) => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }

        case "SET-TASK": {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy;
        }

        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskTypeApi): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, model: DomainUpdateTaskModelType, todolistId: string): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', model, todolistId, taskId}
}
export const setTaskAC = (tasks: TaskTypeApi[], todolistId: string) => {
    return {type: "SET-TASK", tasks, todolistId} as const
}

export type SetTaskActionType = ReturnType<typeof setTaskAC>

export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch<TaskActionsType | SetStatusACType | SetErrorACType>) => {
        dispatch(setAppStatusAC("loading"))
        todoApi.getTasks(todolistId).then((res) => {
            dispatch(setTaskAC(res.data.items, todolistId))
            dispatch(setAppStatusAC("succeeded"))

        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        });
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC("loading"))
        todoApi.deleteTasks(todolistId, taskId).then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
            dispatch(setAppStatusAC("succeeded"))
        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        });
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<TaskActionsType | SetErrorACType | SetStatusACType>) => {
        dispatch(setAppStatusAC("loading"))
        todoApi.postTasks(title, todolistId).then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        });
    }
}

export type DomainUpdateTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}


export const updateTaskTC = (todolistId: string, taskId: string, domainModel: DomainUpdateTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            return
        }
        const model: TaskModelType = {
            status: task.status,
            startDate: task.startDate,
            description: task.description,
            deadline: task.deadline,
            title: task.title,
            priority: task.priority,
            ...domainModel

        }
        dispatch(setAppStatusAC("loading"))
        todoApi.putTasks(todolistId, taskId, model).then((res) => {

            if (res.data.resultCode === 0) {
                dispatch(updateTaskAC(taskId, domainModel, todolistId))
                dispatch(setAppStatusAC("succeeded"))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        }).catch(error => {
            handleServerNetworkError(error, dispatch)
        });
    }
}

