import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

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

    let [newTasktitle, setnewTasktitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const buttonAddTask = () => {
        if (newTasktitle.trim() !== '') {
            props.addTasks(newTasktitle,props.id)
            setnewTasktitle('')
        } else {
            setError('Title is required')
        }
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setnewTasktitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        event.charCode === 13 && buttonAddTask()
        setError(null)
    }
    const onClickAllHandler = () => props.changeFilter('all',props.id)
    const onClickActiveHandler = () => props.changeFilter('active',props.id)
    const onClicCompletedHandler = () => props.changeFilter('completed',props.id)
    const onClickRemoveTodoList=()=>props.removeTodolist(props.id)
    return (
        <div>
            <h3>{props.title}<button onClick={onClickRemoveTodoList}>X</button></h3>
            <div>
                <input value={newTasktitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''} />
                <button onClick={buttonAddTask}>+</button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {
                    props.tasks.map(t => {
                        const onRemoveHandler = () => props.removeTask(t.id,props.id)
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(t.id, e.currentTarget.checked,props.id)
                        }
                        return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                checked={t.isDone}
                                onChange={onChangeHandler} />
                            <span>{t.title}</span>
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