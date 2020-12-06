import { Grid, Paper } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { TaskStatuses } from "../../api/todolist-api";
import { AppRootStateType } from "../../app/store";
import { AddItemForm } from "../../components/AddItemForm/AddItemForm";
import { createTask, removeTaskTC, updateTask } from "./tasks-reducer";
import TodoList from "./todolist/Todolist";
import {
  ChangeTodolistFilterAC,
  createTodolist,
  fetchTodolists,
  filtersValueType,
  removeTodolistTC,
  updateTodolist,
} from "./todolists-reducer";

type TodoPropsType = {
  demo?: boolean
}

export const TodolistList: React.FC<TodoPropsType> = ({demo = false}) => {
  const dispatch = useDispatch();
  const { todoLists, tasks1 } = useSelector<AppRootStateType, AppRootStateType>(
    (state) => state
  );
  const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
  useEffect(() => {
    if(demo||!isLoggedIn){
      return
    }
    dispatch(fetchTodolists());
  }, []);

  const addTasks = useCallback(
    (title: string, todolistId: string) => {
      dispatch(createTask(title, todolistId));
      changeFilter("all", todolistId);
    },
    [dispatch]
  );
  const removeTask = useCallback(
    (id: string, todolistId: string) => {
      dispatch(removeTaskTC(id, todolistId));
    },
    [dispatch]
  );
  const changeStatus = useCallback(
    (id: string, status: TaskStatuses, todolistId: string) => {
      dispatch(updateTask(id, { status }, todolistId));
    },
    [dispatch]
  );
  const changeFilter = useCallback(
    (value: filtersValueType, todolistId: string) => {
      dispatch(ChangeTodolistFilterAC(todolistId, value));
    },
    [dispatch]
  );
  const removeTodolist = useCallback(
    (todolistId: string) => {
      dispatch(removeTodolistTC(todolistId));
    },
    [dispatch]
  );
  const addTodoList = useCallback(
    (title: string) => {
      dispatch(createTodolist(title));
    },
    [dispatch]
  );
  const changeTaskTitle = useCallback(
    (id: string, newTitile: string, todolistdId: string) => {
      dispatch(updateTask(id, { title: newTitile }, todolistdId));
    },
    [dispatch]
  );
  const changeTodoListTitle = useCallback(
    (newTitile: string, todolistdId: string) => {
      dispatch(updateTodolist(todolistdId, newTitile));
    },
    [dispatch]
  );

  if (!isLoggedIn) {
    return <Redirect to={"/login"} />;
  }

  return (
    <>
      <Grid container style={{ padding: "20px" }}>
        <AddItemForm addItem={addTodoList} />
      </Grid>
      <Grid container spacing={3}>
        {todoLists.map((el) => {
          let tasksForTodolist = tasks1[el.id];
          return (
            <Grid item key={el.id}>
              <Paper elevation={8} style={{ padding: "10px" }}>
                <TodoList
                  todolist={el}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTasks={addTasks}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
