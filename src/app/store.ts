import { authReducer } from './../features/login/auth-reducer';
import { appReducer } from './app-reducer';
import { tasksReducer } from '../features/todolistList/tasks-reducer';
import { todolistsReducer } from '../features/todolistList/todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks1: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))

//@ts-ignore
window.store = store