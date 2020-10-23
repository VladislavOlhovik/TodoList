import React from 'react';
import './App.css';
import TodoList, { filtersValueType, TaskType } from './Todolist';
import { AddItemForm } from './AddItemForm';
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { AddTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC, ChangeTodolistFilterAC } from './state/todolists-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';

export type TasksStateType = {
    [key:string]:Array<TaskType>
}

function AppWithRedux() {
  const dispatch = useDispatch()
  const {todoLists,tasks1} = useSelector<AppRootStateType,AppRootStateType>(state=>state)

    
    function addTasks(title: string, todolistId: string) {
      dispatch(addTaskAC(title,todolistId))
        changeFilter("all", todolistId)
    }
    function removeTask(id: string, todolistId: string) {
      dispatch(removeTaskAC(id,todolistId))
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
      dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }
    function changeFilter(value: filtersValueType, todolistId: string) {
      dispatch(ChangeTodolistFilterAC(todolistId,value))
    }
    function removeTodolist(todolistId: string) {
      dispatch(RemoveTodolistAC(todolistId))
    }
    function addTodoList (title:string){
      dispatch(AddTodolistAC(title))
    }
    function changeTaskTitle(id: string, newTitile:string, todolistdId:string){
      dispatch(changeTaskTitleAC(id,newTitile,todolistdId))
    }
    function changeTodoListTitle(newTitile:string, todolistdId:string){
      dispatch(ChangeTodolistTitleAC(todolistdId,newTitile))
    }
 
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

              if (el.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter((r) => !r.isDone);
              }
              if (el.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter((r) => r.isDone);
              }

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
