import { authReducer } from './../features/login/auth-reducer';
import { appReducer } from './app-reducer';
import { tasksReducer } from '../features/todolistList/tasks-reducer';
import { todolistsReducer } from '../features/todolistList/todolists-reducer';
import { combineReducers } from "redux";
import {configureStore} from '@reduxjs/toolkit'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks1: tasksReducer,
    app: appReducer,
    auth: authReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>

// export const store = createStore(rootReducer,applyMiddleware(thunk))
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

//@ts-ignore
window.store = store