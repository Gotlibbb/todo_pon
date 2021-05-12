import React from 'react'
import {Provider} from 'react-redux'
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {tasksReducer} from '../../state/tasks-reducer'
import {todolistsReducer} from '../../state/todolists-reducer'
import {v1} from 'uuid'
import {AppRootStateType} from '../../state/store'
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../state/app-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer

})



const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all",entityStatus: "loading",  addedDate: "", order: 0 },
        {id: "todolistId2", title: "What to buy", filter: "all",entityStatus: "idle", addedDate: "", order: 0}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                addedDate: "",
                deadline: "",
                description: "",
                startDate: "",
                todoListId: "",
                order: 0
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                addedDate: "",
                deadline: "",
                description: "",
                startDate: "",
                todoListId: "",
                order: 0
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                addedDate: "",
                deadline: "",
                description: "",
                startDate: "",
                todoListId: "",
                order: 0
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Low,
                addedDate: "",
                deadline: "",
                description: "",
                startDate: "",
                todoListId: "",
                order: 0
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState as unknown as AppRootStateType, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => (
    <Provider
        store={storyBookStore}>{storyFn()}
    </Provider>)
