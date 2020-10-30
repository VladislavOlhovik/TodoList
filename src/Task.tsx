import React, { ChangeEvent, useCallback } from 'react';
import {  Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { EditableSpan } from './EditableSpan';
import { TaskType } from './Todolist'

type TaskPropsType = {
    id:string
    task: TaskType
    removeTask: (id: string, todolistdId:string) => void
    changeTaskStatus: (id: string, isDone: boolean,todolistdId:string) => void
    changeTaskTitle:(id: string, newTitile:string, todolistdId:string)=>void
}
 
export const Task = React.memo((props:TaskPropsType) => {
  const onRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.id),[props.removeTask,props.task.id, props.id]);
  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.id);
  },[props.changeTaskStatus, props.task.id, props.id])
  const onChangeTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(props.task.id, newTitle, props.id);
  },[props.changeTaskTitle,props.task.id,props.id]);
  return (
    <div key={props.task.id} style={{ fontSize: "19px" }}>
      <Checkbox
        color="primary"
        checked={props.task.isDone}
        onChange={onChangeStatusHandler}
      />
      <EditableSpan
        onChange={onChangeTitleHandler}
        title={props.task.title}
        isDone={props.task.isDone}
      />
      <IconButton onClick={onRemoveHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});