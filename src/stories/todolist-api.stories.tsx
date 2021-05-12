import React, {useEffect, useState} from 'react'
// import {TaskPriorities, TaskStatuses, todoApi} from "../api/todolist-api";
//
//
// export default {
//     title: 'API'
// }
//
//
// // export const GetTodolists = () => {
// //     const [state, setState] = useState<any>(null)
// //     useEffect(() => {
// //         todoApi.getTodos().then((res)=> setState(res.data))
// //
// //     }, [])
// //
// //     return <div> {JSON.stringify(state)}</div>
// // }
// //
// //
// // export const CreateTodolist = () => {
// //     const [state, setState] = useState<any>(null)
// //     useEffect(() => {
// //         todoApi.postTodos("1231231").then(res=>setState(res.data))
// //     }, [])
// //
// //
// //
// //     return <div> {JSON.stringify(state)}</div>
// //
// //
// // }
// //
// //
// //
// // export const DeleteTodolist = () => {
// //     const [state, setState] = useState<any>(null)
// //     useEffect(() => {
// //         // здесь мы будем делать запрос и ответ закидывать в стейт.
// //         // который в виде строки будем отображать в div-ке
// //
// //
// //         const todolistId = '77762aab-bcf8-4e31-b8b4-0f374411da25';
// //         todoApi.deleteTodos(todolistId).then( (res) => {
// //             setState(res.data);
// //         })
// //
// //     }, [])
// //
// //     return <div> {JSON.stringify(state)}</div>
// // }
// // export const UpdateTodolistTitle = () => {
// //     const [state, setState] = useState<any>(null)
// //     useEffect(() => {
// //         // здесь мы будем делать запрос и ответ закидывать в стейт.
// //         // который в виде строки будем отображать в div-ке
// //         const todolistId = '77762aab-bcf8-4e31-b8b4-0f374411da25';
// //         todoApi.putTodos("123", todolistId).then( (res) => {
// //             setState(res.data);
// //         })
// //
// //     }, [])
// //
// //
// //
// //     return <div> {JSON.stringify(state)}</div>
// // }
//
// export const getTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todoApi.getTasks("bf0981da-386e-4b12-9e2c-5fd331c8174e").then((res) => setState(res.data.items))
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const postTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todoApi.postTasks("bf0981da-386e-4b12-9e2c-5fd331c8174e", "первая таска").then((res) => setState(res.data))
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const deleteTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todoApi.deleteTasks("bf0981da-386e-4b12-9e2c-5fd331c8174e", "8af57149-317a-4d96-91bc-f4535f689293").then((res) => setState(res.data))
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
// export const putTasks = () => {
//     const [state, setState] = useState<any>(null)
//     useEffect(() => {
//         todoApi.putTasks("bf0981da-386e-4b12-9e2c-5fd331c8174e", "da4b636c-5643-430e-92de-d4743de5c658", {
//             title: "жопная таска",
//             priority: TaskPriorities.Low,
//             completed: false,
//             deadline: "",
//             description: "",
//             startDate: "",
//             status: TaskStatuses.New
//         }).then((res) => setState(res.data.data))
//
//     }, [])
//
//     return <div> {JSON.stringify(state)}</div>
// }
//
