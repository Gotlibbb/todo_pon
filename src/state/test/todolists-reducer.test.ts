import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    setTodolistAC, setTodolistStatusAC,
    todolistsReducer
} from '../todolists-reducer';
import {v1} from 'uuid';
import {FilterValuesType} from '../../components/App';
import {TodolistDomainType} from '../todolists-reducer';
import {TodolistTypeApi} from "../../api/todolist-api";
import {RequestStatusType} from "../app-reducer";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", entityStatus: "idle", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", entityStatus: "idle", filter: "all", addedDate: "", order: 0}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let newTodolistTitle: TodolistTypeApi = {
        title: "New Todolist",
        id: "123",
        addedDate: "",
        order: 0,

    };

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const action = changeTodolistFilterAC(todolistId2, newFilter);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('set todolist ', () => {
    let newTodolists: TodolistTypeApi[] =
        [
            {id: "tdl", title: "tdl", addedDate: "", order: 0},
            {id: "tdl1", title: "tdl1", addedDate: "", order: 0},
        ];

    const action = setTodolistAC(newTodolists);

    const endState = todolistsReducer([], action);

    expect(endState[1].filter).toBe("all");
    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe("tdl");
});

test('correct entityStatus of todolist should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const action = setTodolistStatusAC(newStatus, todolistId2);

    const endState = todolistsReducer(startState, action);

    expect(endState[1].entityStatus).toBe("loading");
});
