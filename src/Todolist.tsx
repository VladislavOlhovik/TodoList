import { Button,  IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import React, { useCallback } from 'react';
import { AddItemForm } from './AddItemForm';
import { TaskStatuses, TaskType } from './api/todolist-api';
import { EditableSpan } from './EditableSpan';
import { filtersValueType } from './state/todolists-reducer';
import { Task } from './Task';

export type TodoListPropsType = {
    id:string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistdId:string) => void
    changeTaskStatus: (id: string, status: TaskStatuses,todolistdId:string) => void
    changeTaskTitle:(id: string, newTitile:string, todolistdId:string)=>void
    changeFilter: (value: filtersValueType,todolistdId:string) => void
    addTasks: (title: string,todolistdId:string) => void
    filter: filtersValueType
    removeTodolist:(todolistdId:string)=>void
    changeTodoListTitle:(newTitile:string, todolistdId:string)=>void
}

const TodoList = React.memo((props: TodoListPropsType) => {
  console.log('TodoList');
  let tasksForTodolist = props.tasks
  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter((r) => r.status===TaskStatuses.New);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter((r) => r.status===TaskStatuses.Completed);
  }
    const onClickAllHandler = useCallback(() => props.changeFilter('all',props.id), [props.id, props.changeFilter])
    const onClickActiveHandler = useCallback(() => props.changeFilter('active',props.id), [props.id, props.changeFilter])
    const onClicCompletedHandler = useCallback(() => props.changeFilter('completed',props.id), [props.id, props.changeFilter])
    const onClickRemoveTodoList = useCallback(()=>props.removeTodolist(props.id), [props.id, props.removeTodolist])
    const addItem = useCallback((title:string)=>props.addTasks(title,props.id),[props.addTasks, props.id])
    const changeTodoListTitle=useCallback((newTitle:string)=>props.changeTodoListTitle(newTitle,props.id),[props.changeTodoListTitle,props.id])
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
          {tasksForTodolist.map((t) => {
            return <Task changeTaskStatus={props.changeTaskStatus}
                         changeTaskTitle={props.changeTaskTitle}
                         removeTask={props.removeTask}
                         task={t}
                         id={props.id}
                         key={t.id}/>
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
})
export default TodoList;

