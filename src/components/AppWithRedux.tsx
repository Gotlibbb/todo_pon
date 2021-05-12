import React, {useCallback, useEffect} from 'react'
import {AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
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


    if (!initialized) return <CircularProgress/>

    return (
        <BrowserRouter>
            <div className="App">
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Typography variant="h6">
                            News
                        </Typography>

                        {authorized &&
                        <Button color="inherit" onClick={logOutHandler}>Logout</Button>}
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



