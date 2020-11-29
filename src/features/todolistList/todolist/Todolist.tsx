import { Button,  IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AddItemForm } from '../../../components/AddItemForm/AddItemForm';
import { TaskStatuses, TaskDomainType } from '../../../api/todolist-api';
import { EditableSpan } from '../../../components/EditableSpan/EditableSpan';
import { fetchTasks } from '../tasks-reducer';
import { filtersValueType, TodolistDomainType } from '../todolists-reducer';
import { Task } from './task/Task';

export type TodoListPropsType = {
    todolist: TodolistDomainType
    tasks: Array<TaskDomainType>
    removeTask: (id: string, todolistdId:string) => void
    changeTaskStatus: (id: string, status: TaskStatuses,todolistdId:string) => void
    changeTaskTitle:(id: string, newTitile:string, todolistdId:string)=>void
    changeFilter: (value: filtersValueType,todolistdId:string) => void
    addTasks: (title: string,todolistdId:string) => void
    removeTodolist:(todolistdId:string)=>void
    changeTodoListTitle:(newTitile:string, todolistdId:string)=>void
}

const TodoList = React.memo((props: TodoListPropsType) => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchTasks(props.todolist.id))
  },[])
  console.log('TodoList');
  let tasksForTodolist = props.tasks
  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((r) => r.status===TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter((r) => r.status===TaskStatuses.Completed);
  }
    const onClickAllHandler = useCallback(() => props.changeFilter('all',props.todolist.id), [props.todolist.id, props.changeFilter])
    const onClickActiveHandler = useCallback(() => props.changeFilter('active',props.todolist.id), [props.todolist.id, props.changeFilter])
    const onClicCompletedHandler = useCallback(() => props.changeFilter('completed',props.todolist.id), [props.todolist.id, props.changeFilter])
    const onClickRemoveTodoList = useCallback(()=>props.removeTodolist(props.todolist.id), [props.todolist.id, props.removeTodolist])
    const addItem = useCallback((title:string)=>props.addTasks(title,props.todolist.id),[props.addTasks, props.todolist.id])
    const changeTodoListTitle=useCallback((newTitle:string)=>props.changeTodoListTitle(newTitle,props.todolist.id),[props.changeTodoListTitle,props.todolist.id])
    return (
      <div>
        <h3>
          <EditableSpan title={props.todolist.title} onChange={changeTodoListTitle} disabled={props.todolist.entityStatus!=='loading'}/>
          <IconButton onClick={onClickRemoveTodoList} disabled={props.todolist.entityStatus==='loading'}>
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm addItem={addItem} disabled={props.todolist.entityStatus==='loading'}/>
        <div>
          {tasksForTodolist.map((t) => {
            return <Task changeTaskStatus={props.changeTaskStatus}
                         changeTaskTitle={props.changeTaskTitle}
                         removeTask={props.removeTask}
                         task={t}
                         id={props.todolist.id}
                         key={t.id}/>
            })}
        </div>
        <div>
          <Button
            size='small'
            variant={props.todolist.filter === "all" ? "contained" : "text"}
            onClick={onClickAllHandler}
            color='default'
          >
            All
          </Button>
          <Button
            style={{margin:'0 5px'}}
            size='small'
            variant={props.todolist.filter === "active" ? "contained" : "text"}
            onClick={onClickActiveHandler}
            color='primary'>
            Active
          </Button>
          <Button
            size='small'
            variant={props.todolist.filter === "completed" ? "contained" : "text"}
            onClick={onClicCompletedHandler}
            color='secondary'>
            Completed
          </Button>
        </div>
      </div>
    );
})
export default TodoList;

