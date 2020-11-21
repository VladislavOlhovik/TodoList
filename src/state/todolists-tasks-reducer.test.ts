import { TaskStatuses, TaskPriorities } from './../api/todolist-api';
import { RemoveTodolistAC, TodolistDomainType } from './todolists-reducer';
import { TasksStateType } from './../App';
import { tasksReducer } from './tasks-reducer';
import { AddTodolistAC, todolistsReducer } from './todolists-reducer';
test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
 
    const action = AddTodolistAC("new todolist");
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
 });
 test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: 'todoListId1', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "React", status: TaskStatuses.New, todoListId: 'todoListId1', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", title: "tea", status: TaskStatuses.New, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };
 
    const action = RemoveTodolistAC("todolistId2");
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
 });
 
 