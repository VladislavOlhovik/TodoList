import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { loginTC } from './auth-reducer';
import { AppRootStateType } from '../../app/store'
import { Redirect } from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
 }

export const Login = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
     
    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
        rememberMe: false,
      },
      validate: (values) => {
        const errors: FormikErrorType = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        if(!values.password){
            errors.password = "Required";
        } else if (values.password.length<4){
            errors.password = "Invalid password. Min length 4 symbol";
        }
        return errors;
      },
      onSubmit: (values) => {
        dispatch(loginTC(values))
      },
    });
    if(isLoggedIn){
        return <Redirect to={'/'}/>
    }
   return (
     <Grid container justify="center">
       <Grid item xs={4}>
         <FormControl>
           <FormLabel>
             <p>
               To log in get registered
               <a
                 href={"https://social-network.samuraijs.com/"}
                 target={"blank"}
               >
                 here
               </a>
             </p>
             <p>or use common test account credentials:</p>
             <p>Email: free@samuraijs.com</p>
             <p>Password: free</p>
           </FormLabel>
           <form onSubmit={formik.handleSubmit}>
             <FormGroup>
               <TextField
                 label="Email"
                 margin="normal"
                 {...formik.getFieldProps("email")}
               />
               {formik.touched.email&&formik.errors.email
               ?<div style={{color:'red'}}>{formik.errors.email}</div>
               :null}
               <TextField
                 type="password"
                 label="Password"
                 margin="normal"
                 {...formik.getFieldProps("password")}
               />
               {formik.touched.password&&formik.errors.password
               ?<div style={{color:'red'}}>{formik.errors.password}</div>
               :null}
               <FormControlLabel
                 label={"Remember me"}
                 control={<Checkbox {...formik.getFieldProps("rememberMe")} />}
               />
               <Button disabled={!!formik.errors.email||!!formik.errors.password} type={"submit"} variant={"contained"} color={"primary"}>
                 Login
               </Button>
             </FormGroup>
           </form>
         </FormControl>
       </Grid>
     </Grid>
   );
}

