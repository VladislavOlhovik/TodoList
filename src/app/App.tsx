import React, { useEffect } from 'react';
import './App.css';
import { AppBar, Button, CircularProgress, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {  TaskDomainType } from '../api/todolist-api';
import { TodolistList } from '../features/todolistList/TodolistList';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { initialazedTC, RequestStatusType } from './app-reducer';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Login } from '../features/login/login';
import { logoutTC } from '../features/login/auth-reducer';

export type TasksStateType = {
    [key:string]:Array<TaskDomainType>
}

function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)    
    const isInitialazed = useSelector<AppRootStateType, boolean>(state=>state.app.isInitialazed)
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const logout = () => {
      dispatch(logoutTC())
    }

    useEffect(()=>{
      dispatch(initialazedTC())
    },[])
    if (!isInitialazed) {
      return (
        <div
          style={{
            position: "fixed",
            top: "30%",
            textAlign: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </div>
      );
    }
    return (
      <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            {isLoggedIn&&<Button color="inherit" onClick={logout}>Log out</Button>}
          </Toolbar>
          <div style={{height:'4px'}}>
            {status==='loading'&&<LinearProgress/>}
          </div>
        </AppBar>
        <Container fixed>
          <Switch>
            <Route exact path = {'/'} render={() => <TodolistList/>} />
            <Route path = {'/login'} render={() => <Login/>} />
            <Route path={ '/404' } render={ () => <h1>404: PAGE NOT FOUND</h1> }/>
            <Redirect from={ '*' } to={ '/404' }/>
          </Switch>
        </Container>
      </div>
    );
}


export default AppWithRedux;
