import React, { useCallback, useEffect } from 'react';
import './App.css';
import TodoList from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { ChangeTodolistFilterAC, filtersValueType, fetchTodolists, removeTodolistTC, createTodolist, updateTodolist } from './state/todolists-reducer';
import { removeTaskTC, createTask, updateTask } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TaskStatuses, TaskType } from './api/todolist-api';

export type TasksStateType = {
    [key:string]:Array<TaskType>
}

function AppWithRedux() {
  const dispatch = useDispatch()
  const {todoLists,tasks1} = useSelector<AppRootStateType,AppRootStateType>(state=>state)
  useEffect(()=>{
    dispatch(fetchTodolists())
  },[])
    
    const addTasks = useCallback((title: string, todolistId: string) => {
      dispatch(createTask(title,todolistId))
        changeFilter("all", todolistId)
    },[dispatch])
    const removeTask = useCallback((id: string, todolistId: string) => {
      dispatch(removeTaskTC(id,todolistId))
    },[dispatch])
    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTask(id, { status }, todolistId))
    },[dispatch])
    const changeFilter = useCallback((value: filtersValueType, todolistId: string) => {
      dispatch(ChangeTodolistFilterAC(todolistId,value))
    },[dispatch])
    const removeTodolist = useCallback((todolistId: string) => {
      dispatch(removeTodolistTC(todolistId))
    },[dispatch])
    const addTodoList = useCallback((title:string) => {
      dispatch(createTodolist(title))
    },[dispatch])
    const changeTaskTitle = useCallback((id: string, newTitile:string, todolistdId:string) => {
      dispatch(updateTask(id,{ title: newTitile },todolistdId))
    },[dispatch])
    const changeTodoListTitle = useCallback((newTitile:string, todolistdId:string) => {
      dispatch(updateTodolist(todolistdId,newTitile))
    },[dispatch])
 
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <Menu />
            </IconButton>
            <Typography variant="h6">News</Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
        <Container fixed>
          <Grid container style={{padding:'20px'}}>
            <AddItemForm addItem={addTodoList} />
          </Grid>
          <Grid container spacing={3}>
            {todoLists.map((el) => {
              let tasksForTodolist = tasks1[el.id];             

              return (
                <Grid item key={el.id}>
                  <Paper elevation={8} style={{padding:'10px'}}>
                    <TodoList
                      id={el.id}
                      title={el.title}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTasks={addTasks}
                      changeTaskStatus={changeStatus}
                      filter={el.filter}
                      removeTodolist={removeTodolist}
                      changeTaskTitle={changeTaskTitle}
                      changeTodoListTitle={changeTodoListTitle}
                    />
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </div>
    );
}


export default AppWithRedux;
