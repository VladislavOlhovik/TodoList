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
export type TodoListType = {
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
            <h3><EditableSpan title={props.title} onChange={changeTodoListTitle}/><button onClick={onClickRemoveTodoList}>X</button></h3>
            <AddItemForm addItem={addItem}/>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id,props.id)
                        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
                        }
                        const onChangeTitleHandler=(newTitle:string)=>{
                            props.changeTaskTitle(t.id,newTitle,props.id)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeStatusHandler} />
                                <EditableSpan onChange={onChangeTitleHandler} title={t.title}/>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onClickAllHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onClickActiveHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onClicCompletedHandler}>Completed</button>
            </div>
        </div>
    )
}
export default TodoList;

