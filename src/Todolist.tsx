import { Button, Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { ChangeEvent } from 'react';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

export type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistdId:string) => void
    changeFilter: (value: filtersValueType,todolistdId:string) => void
    addTasks: (title: string,todolistdId:string) => void
    changeTaskStatus: (id: string, isDone: boolean,todolistdId:string) => void
    filter: filtersValueType
    removeTodolist:(todolistdId:string)=>void
    changeTaskTitle:(id: string, newTitile:string, todolistdId:string)=>void
    changeTodoListTitle:(newTitile:string, todolistdId:string)=>void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export type TodolistType = {
    id: string
    title: string
    filter: filtersValueType
}
export type filtersValueType = 'all' | 'active' | 'completed'

function TodoList(props: TodoListPropsType) {
    const onClickAllHandler = () => props.changeFilter('all',props.id)
    const onClickActiveHandler = () => props.changeFilter('active',props.id)
    const onClicCompletedHandler = () => props.changeFilter('completed',props.id)
    const onClickRemoveTodoList=()=>props.removeTodolist(props.id)
    const addItem=(title:string)=>props.addTasks(title,props.id)
    const changeTodoListTitle=(newTitle:string)=>props.changeTodoListTitle(newTitle,props.id)
    return (
      <div>
        <h3>
          <EditableSpan title={props.title} onChange={changeTodoListTitle} />
          <IconButton onClick={onClickRemoveTodoList}>
            <Delete />
          </IconButton>
        </h3>
        <AddItemForm addItem={addItem} />
        <div>
          {props.tasks.map((t) => {
            const onRemoveHandler = () => props.removeTask(t.id, props.id);
            const onChangeStatusHandler = (
              e: ChangeEvent<HTMLInputElement>
            ) => {
              props.changeTaskStatus(t.id, e.currentTarget.checked, props.id);
            };
            const onChangeTitleHandler = (newTitle: string) => {
              props.changeTaskTitle(t.id, newTitle, props.id);
            };
            return (
              <div key={t.id} style={{fontSize: '19px'}}>
                <Checkbox
                  color='primary'
                  checked={t.isDone}
                  onChange={onChangeStatusHandler}
                />
                <EditableSpan onChange={onChangeTitleHandler} title={t.title} isDone={t.isDone}/>
                <IconButton onClick={onRemoveHandler}>
                  <Delete/>
                </IconButton>
              </div>
            );
          })}
        </div>
        <div>
          <Button
            size='small'
            variant={props.filter === "all" ? "contained" : "text"}
            onClick={onClickAllHandler}
            color='default'
          >
            All
          </Button>
          <Button
            style={{margin:'0 5px'}}
            size='small'
            variant={props.filter === "active" ? "contained" : "text"}
            onClick={onClickActiveHandler}
            color='primary'>
            Active
          </Button>
          <Button
            size='small'
            variant={props.filter === "completed" ? "contained" : "text"}
            onClick={onClicCompletedHandler}
            color='secondary'>
            Completed
          </Button>
        </div>
      </div>
    );
}
export default TodoList;

