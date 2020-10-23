import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { combineReducers, createStore } from "redux";

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks1: tasksReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)