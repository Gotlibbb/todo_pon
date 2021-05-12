import React, {useCallback, useEffect} from 'react'
import {AppBar, Button, CircularProgress, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {ErrorSnackBar} from "../utils/ErrorSnackBar";
import {InitializedTC, InitialStateType} from "../state/app-reducer";
import {TodoListList} from "./TodoListList";
import {Login} from "./Login";
import {BrowserRouter, Route} from 'react-router-dom';
import {LogoutTC} from "../state/auth-reducer";


type AppPropsType = {
    demo?: boolean
}

function AppWithRedux({demo = false}: AppPropsType) {


    const app = useSelector<AppRootStateType, InitialStateType>(state => state.app)
    const dispatch = useDispatch();
    const authorized = useSelector<AppRootStateType, boolean>(state => state.auth.authorized)
    const initialized = useSelector<AppRootStateType, boolean>(state => state.app.initialized)

    useEffect(() => {
        dispatch(InitializedTC())
    }, [])

    const logOutHandler = useCallback(
        () => dispatch(LogoutTC()), []
    )


    if (!initialized) return <div style={{textAlign: "center", paddingTop: "400px"}}><CircularProgress /></div>

    return (
        <BrowserRouter>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6">
                            TodoList
                        </Typography>

                        {authorized &&
                        <div style={{width: "100%" }}><Button style={{float: "right"}} color="inherit" onClick={logOutHandler}>Logout</Button></div>}
                    </Toolbar>

                </AppBar>


                <div style={{height: "5px"}}>
                    {app.status === "loading" && <LinearProgress/>}
                </div>
                <ErrorSnackBar/>
                <Route exact path={"/"} render={() => <TodoListList demo={demo}/>}/>
                <Route path={"/login"} render={() => <Login/>}/>


            </div>
        </BrowserRouter>
    );
}

export default AppWithRedux;



