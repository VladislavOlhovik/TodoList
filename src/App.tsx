import React, { useState } from 'react';
import './App.css';
import TodoList, { filtersValueType, TodoListType, TaskType } from './Todolist';
import { v1 } from 'uuid';
import { AddItemForm } from './AddItemForm';

type TaskStateType = {
    [key:string]:Array<TaskType>
}

function App() {
    let todoListId1 = v1()
    let todoListId2 = v1()
    let todoListId3 = v1()

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        { id: todoListId1, title: 'What to learn', filter: 'all' },
        { id: todoListId2, title: 'What to buy', filter: 'all' },
        { id: todoListId3, title: 'What to buy', filter: 'all' }
    ])

    let [tasks1, setTasks1] = useState<TaskStateType>({
        [todoListId1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReackJS', isDone: false },
            { id: v1(), title: 'rest api', isDone: false },
            { id: v1(), title: 'graphQL', isDone: false }
        ],
        [todoListId2]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReackJS', isDone: false },
            { id: v1(), title: 'rest api', isDone: false },
            { id: v1(), title: 'graphQL', isDone: false }
        ],
        [todoListId3]: [
            { id: v1(), title: 'Book', isDone: true },
            { id: v1(), title: 'Milk', isDone: true }
        ]
    })

    function addTasks(title: string, todolistId: string) {
        let todoListTasks = tasks1[todolistId]
        const newTask = { id: v1(), title: title, isDone: false }
        tasks1[todolistId] = [newTask, ...todoListTasks]
        setTasks1({ ...tasks1 })
    }
    function removeTask(id: string, todolistId: string) {
        let todoListTasks = tasks1[todolistId]
        tasks1[todolistId] = todoListTasks.filter(t => t.id !== id)
        setTasks1({ ...tasks1 });
    }
    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todoListTasks = tasks1[todolistId]
        let statusTask = todoListTasks.find(el => el.id === id)
        if (statusTask) {
            statusTask.isDone = isDone
            setTasks1({ ...tasks1 })
        }
    }
    function changeFilter(value: filtersValueType, todolistId: string) {
        let todoList = todoLists.find((el) => el.id == todolistId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }
    }
    function removeTodolist(todolistId: string) {
        setTodoLists(todoLists.filter(el => el.id !== todolistId))
        delete tasks1[todolistId]
        setTasks1({...tasks1})
    }
    function addTodoList (title:string){
        let newTodoList:TodoListType={
            id:v1(),
            title:title,
            filter:'all'
        }
        setTodoLists([newTodoList,...todoLists])
        setTasks1({...tasks1,[newTodoList.id]:[]})
    }
    function changeTaskTitle(id: string, newTitile:string, todolistdId:string){
        let todoList = tasks1[todolistdId]
        let task = todoList.find(el=>el.id===id)
        if(task){
            task.title=newTitile
            setTasks1({...tasks1})
        }
    }
    function changeTodoListTitle(newTitile:string, todolistdId:string){
        let todoList=todoLists.find(el=>el.id===todolistdId)
        if(todoList){
            todoList.title=newTitile
            setTodoLists([...todoLists])
        }
    }
 
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {todoLists.map((el) => {
                let tasksForTodolist = tasks1[el.id];

                if (el.filter === 'active') {
                    tasksForTodolist = tasksForTodolist.filter(r => !r.isDone)
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasksForTodolist.filter(r => r.isDone)
                }

                return <TodoList
                    key={el.id}
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
                    changeTodoListTitle={changeTodoListTitle} />
            })}
        </div>
    );
}


export default App;
