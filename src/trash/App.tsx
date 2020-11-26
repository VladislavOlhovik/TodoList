// import React, { useState } from 'react';
import './App.css';
// import TodoList from '../Todolist';
// import { v1 } from 'uuid';
// import { AddItemForm } from '../components/AddItemForm/AddItemForm';
// import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
// import { Menu } from '@material-ui/icons';
// import { TaskStatuses, TaskType, TaskPriorities } from '../api/todolist-api';
// import { filtersValueType, TodolistDomainType } from '../state/todolists-reducer';

// export type TasksStateType = {
//     [key:string]:Array<TaskType>
// }

// function App() {
//     let todoListId1 = v1()
//     let todoListId2 = v1()

//     let [todoLists, setTodoLists] = useState<Array<TodolistDomainType>>([
//         { id: todoListId1, title: 'What to learn', filter: 'all', addedDate:'', order:0 },
//         { id: todoListId2, title: 'What to buy', filter: 'all', addedDate:'', order:0 }
//     ])

//     let [tasks1, setTasks1] = useState<TasksStateType>({
//         [todoListId1]: [
//             { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId1, description: '', 
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
//             { id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId1, description: '', 
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
//         ],
//         [todoListId2]: [
//             { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId2, description: '', 
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
//             { id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId2, description: '', 
//             startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
//         ]
//     })

//     function addTasks(title: string, todolistId: string) {
//         let todoListTasks = tasks1[todolistId]
//         const newTask = { id: v1(), title: title, status: TaskStatuses.New, todoListId: todolistId, description: '', 
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
//         tasks1[todolistId] = [newTask, ...todoListTasks]
//         changeFilter("all", todolistId)
//         setTasks1({ ...tasks1 })
//     }
//     function removeTask(id: string, todolistId: string) {
//         let todoListTasks = tasks1[todolistId]
//         tasks1[todolistId] = todoListTasks.filter(t => t.id !== id)
//         setTasks1({ ...tasks1 });
//     }
//     function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
//         let todoListTasks = tasks1[todolistId]
//         let statusTask = todoListTasks.find(el => el.id === id)
//         if (statusTask) {
//             statusTask.status = status
//             setTasks1({ ...tasks1 })
//         }
//     }
//     function changeFilter(value: filtersValueType, todolistId: string) {
//         let todoList = todoLists.find((el) => el.id === todolistId)
//         if (todoList) {
//             todoList.filter = value
//             setTodoLists([...todoLists])
//         }
//     }
//     function removeTodolist(todolistId: string) {
//         setTodoLists(todoLists.filter(el => el.id !== todolistId))
//         delete tasks1[todolistId]
//         setTasks1({...tasks1})
//     }
//     function addTodoList (title:string){
//         let newTodoList:TodolistDomainType={
//             id:v1(),
//             title:title,
//             filter:'all', 
//             addedDate:'', 
//             order:0 
//         }
//         setTodoLists([newTodoList,...todoLists])
//         setTasks1({...tasks1,[newTodoList.id]:[]})
//     }
//     function changeTaskTitle(id: string, newTitile:string, todolistdId:string){
//         let todoList = tasks1[todolistdId]
//         let task = todoList.find(el=>el.id===id)
//         if(task){
//             task.title=newTitile
//             setTasks1({...tasks1})
//         }
//     }
//     function changeTodoListTitle(newTitile:string, todolistdId:string){
//         let todoList=todoLists.find(el=>el.id===todolistdId)
//         if(todoList){
//             todoList.title=newTitile
//             setTodoLists([...todoLists])
//         }
//     }
 
//     return (
//       <div className="App">
//         <AppBar position="static">
//           <Toolbar>
//             <IconButton edge="start" color="inherit" aria-label="menu">
//               <Menu />
//             </IconButton>
//             <Typography variant="h6">News</Typography>
//             <Button color="inherit">Login</Button>
//           </Toolbar>
//         </AppBar>
//         <Container fixed>
//           <Grid container style={{padding:'20px'}}>
//             <AddItemForm addItem={addTodoList} />
//           </Grid>
//           <Grid container spacing={3}>
//             {todoLists.map((el) => {
//               let tasksForTodolist = tasks1[el.id];

//               if (el.filter === "active") {
//                 tasksForTodolist = tasksForTodolist.filter((r) => r.status===TaskStatuses.New);
//               }
//               if (el.filter === "completed") {
//                 tasksForTodolist = tasksForTodolist.filter((r) => r.status===TaskStatuses.Completed);
//               }

//               return (
//                 <Grid item key={el.id}>
//                   <Paper elevation={8} style={{padding:'10px'}}>
//                     <TodoList
//                       id={el.id}
//                       title={el.title}
//                       tasks={tasksForTodolist}
//                       removeTask={removeTask}
//                       changeFilter={changeFilter}
//                       addTasks={addTasks}
//                       changeTaskStatus={changeStatus}
//                       filter={el.filter}
//                       removeTodolist={removeTodolist}
//                       changeTaskTitle={changeTaskTitle}
//                       changeTodoListTitle={changeTodoListTitle}
//                     />
//                   </Paper>
//                 </Grid>
//               );
//             })}
//           </Grid>
//         </Container>
//       </div>
//     );
// }


// export default App;
