import React from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import { LoginTC } from '../state/auth-reducer';
import { Redirect } from 'react-router-dom';
import {AppRootStateType} from "../state/store";

export const Login = () => {

    let dispatch = useDispatch();
    const authorized = useSelector<AppRootStateType, boolean>( state=> state.auth.authorized)

    const formik = useFormik({
        validate: values => {
            if (!values.email) return {email: 'email required'}
            if (!values.password) return {password: 'password required'}
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {

            dispatch(LoginTC(values))


            // alert(JSON.stringify(values));
        },
    })

    if (authorized) {
        return <Redirect to={"/"}/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            // name={"email"}
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            // то же самое дргим способом
                            {...formik.getFieldProps("email")}
                        />
                        {formik.errors.email&& <div>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            // name={"password"}
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            {...formik.getFieldProps("password")}
                        />
                        {formik.errors.password&& <div>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox

                                // onChange={formik.handleChange}
                                // value={formik.values.password}
                                // name={"rememberMe"}
                                checked={formik.values.rememberMe}
                                {...formik.getFieldProps("rememberMe")}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>

                    </FormGroup>
                </FormControl>
            </form>

        </Grid>
    </Grid>

}
