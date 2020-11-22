import { tasksReducer } from './tasks-reducer';
import { todolistsReducer } from './todolists-reducer';
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    todoLists: todolistsReducer,
    tasks1: tasksReducer,
})
export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer,applyMiddleware(thunk))