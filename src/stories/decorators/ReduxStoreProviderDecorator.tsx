import React from "react";
import { Provider } from "react-redux";
import { v1 } from "uuid";
import { AppRootStateType } from "../../state/store";
import { todolistsReducer } from "../../state/todolists-reducer";
import { tasksReducer } from "../../state/tasks-reducer";
import { combineReducers, createStore } from "redux";

const initialGlobalState = {
  todoLists: [
    { id: "todoListId1", title: "What to learn", filter: "all" },
    { id: "todoListId2", title: "What to buy", filter: "all" },
  ],
  tasks1: {
    todoListId1: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
    ],
    todoListId2: [
      { id: v1(), title: "Milk", isDone: true },
      { id: v1(), title: "React Book", isDone: true },
    ],
  },
};
const rootReducer = combineReducers({
  todoLists: todolistsReducer,
  tasks1: tasksReducer,
});

export const storyBookStore = createStore(
  rootReducer,
  initialGlobalState as AppRootStateType
);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
