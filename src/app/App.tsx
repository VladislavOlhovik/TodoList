import React from 'react';
import './App.css';
import { AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import {  TaskDomainType } from '../api/todolist-api';
import { TodolistList } from '../features/todolistList/TodolistList';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './store';
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar';
import { RequestStatusType } from './app-reducer';

export type TasksStateType = {
    [key:string]:Array<TaskDomainType>
}

function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestStatusType>(state=>state.app.status)
    return (
      <div className="App">
        <ErrorSnackbar/>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
          <div style={{height:'4px'}}>
            {status==='loading'&&<LinearProgress/>}
          </div>
        </AppBar>
        <Container fixed>
          <TodolistList/>
        </Container>
      </div>
    );
}


export default AppWithRedux;
