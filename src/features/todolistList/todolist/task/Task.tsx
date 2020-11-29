import React, { ChangeEvent, useCallback } from 'react';
import {  Checkbox, IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan';
import { TaskStatuses, TaskDomainType } from '../../../../api/todolist-api';

export type TaskPropsType = {
    id:string
    task: TaskDomainType
    removeTask: (id: string, todolistdId:string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistdId:string) => void
    changeTaskTitle:(id: string, newTitile:string, todolistdId:string)=>void
}
 
export const Task = React.memo((props:TaskPropsType) => {
  const onRemoveHandler = useCallback(() => props.removeTask(props.task.id, props.id),[props.removeTask,props.task.id, props.id]);
  const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    props.changeTaskStatus(props.task.id, e.currentTarget.checked?TaskStatuses.Completed:TaskStatuses.New, props.id);
  },[props.changeTaskStatus, props.task.id, props.id])
  const onChangeTitleHandler = useCallback((newTitle: string) => {
    props.changeTaskTitle(props.task.id, newTitle, props.id);
  },[props.changeTaskTitle,props.task.id,props.id]);
  return (
    <div key={props.task.id} style={{ fontSize: "19px" }}>
      <Checkbox
        color="primary"
        checked={props.task.status===TaskStatuses.Completed}
        onChange={onChangeStatusHandler}
      />
      <EditableSpan
        disabled={props.task.entityStatus!=='loading'}
        onChange={onChangeTitleHandler}
        title={props.task.title}
        isDone={props.task.status===TaskStatuses.Completed}
      />
      <IconButton onClick={onRemoveHandler} disabled={props.task.entityStatus==='loading'}>
        <Delete />
      </IconButton>
    </div>
  );
});