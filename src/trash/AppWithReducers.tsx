// import React, { useReducer} from 'react';
import './App.css';
// import TodoList from '../Todolist';
// import { v1 } from 'uuid';
// import { AddItemForm } from '../components/AddItemForm/AddItemForm';
// import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
// import { Menu } from '@material-ui/icons';
// import { AddTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer, ChangeTodolistFilterAC, filtersValueType } from '../state/todolists-reducer';
// import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from '../state/tasks-reducer';
// import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolist-api';

// export type TasksStateType = {
//     [key:string]:Array<TaskType>
// }

// function AppWithReducers() {
//     let todoListId1 = v1()
//     let todoListId2 = v1()

//     let [todoLists, dispatchToTodoLists] = useReducer(todolistsReducer,[
//       { id: todoListId1, title: 'What to learn', filter: 'all', addedDate:'', order:0 },
//       { id: todoListId2, title: 'What to buy', filter: 'all', addedDate:'', order:0 }
//     ])
 
//     let [tasks1, dispatchToTasks1] = useReducer(tasksReducer,{
//         [todoListId1]: [
//           { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId1, description: '', 
//           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
//           { id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId1, description: '', 
//           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
//         ],
//         [todoListId2]: [
//           { id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: todoListId2, description: '', 
//           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
//           { id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: todoListId2, description: '', 
//           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
//         ]
//     })

//     function addTasks(title: string, todolistId: string) {
//         dispatchToTasks1(addTaskAC({id: v1(), title, status: TaskStatuses.New, todoListId: todoListId2, description: '', 
//         startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}))
//         changeFilter("all", todolistId)
//     }
//     function removeTask(id: string, todolistId: string) {
//         dispatchToTasks1(removeTaskAC(id,todolistId))
//     }
//     function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
//         dispatchToTasks1(updateTaskAC(id, {status}, todolistId))
//     }
//     function changeFilter(value: filtersValueType, todolistId: string) {
//         dispatchToTodoLists(ChangeTodolistFilterAC(todolistId,value))
//     }
//     function removeTodolist(todolistId: string) {
//         dispatchToTodoLists(RemoveTodolistAC(todolistId))
//         dispatchToTasks1(RemoveTodolistAC(todolistId))
//     }
//     function addTodoList (title:string){
//       const action = AddTodolistAC({ id: 'todoListId2', title, addedDate:'', order:0 })
//         dispatchToTodoLists(action)
//         dispatchToTasks1(action)
//     }
//     function changeTaskTitle(id: string, newTitile:string, todolistdId:string){
//         dispatchToTasks1(updateTaskAC(id, { title:newTitile }, todolistdId))
//     }
//     function changeTodoListTitle(newTitile:string, todolistdId:string){
//         dispatchToTodoLists(ChangeTodolistTitleAC(todolistdId,newTitile))
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


// export default AppWithReducers;
