import React from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import { AppRootStateType } from "../../app/store";
import { todolistsReducer } from "../../features/todolistList/todolists-reducer";
import { tasksReducer } from "../../features/todolistList/tasks-reducer";
import { combineReducers, createStore } from "redux";
import { TaskStatuses, TaskPriorities } from '../../api/todolist-api';
import { appReducer } from "../../app/app-reducer";


const initialGlobalState = {
  todoLists: [
    { id: "todoListId1", title: "What to learn", filter: "all", entityStatus: 'idle', addedDate:'', order:0 },
    { id: "todoListId2", title: "What to buy", filter: "all", entityStatus: 'idle', addedDate:'', order:0 },
  ],
  tasks1: {
    todoListId1: [
      { id: v1(), entityStatus: 'idle', title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '', 
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      { id: v1(), entityStatus: 'idle',title: "JS", status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '', 
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
    ],
    todoListId2: [
      { id: v1(), entityStatus: 'idle',title: "Milk", status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '', 
      startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
      { id: v1(), entityStatus: 'idle',title: "React Book", status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
    ],
  },
  app:{
    status: 'idle',
    error: null,
    isInitialazed: true,
  },
  auth:{
    isLoggedIn: false
  }
};
const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks1: tasksReducer,
  app: appReducer,
});

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
