import { TasksStateType } from './../../app/App';
import { TaskStatuses, TaskPriorities } from '../../api/todolist-api';
import { RemoveTodolistAC, TodolistDomainType } from './todolists-reducer';
import { tasksReducer } from './tasks-reducer';
import { AddTodolistAC, todolistsReducer } from './todolists-reducer';


test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];
    let todolist = {id: "any", title: "new todolist", addedDate:'', order:0 };
    const action = AddTodolistAC({todolist:todolist});
 
    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)
 
    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;
 
    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
 });
 test('property with todolistId should be deleted', () => {
    const startState: TasksStateType = {
        "todolistId1": [
            { id: "1", entityStatus: 'idle', title: "CSS", status: TaskStatuses.New, todoListId: 'todoListId1', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", entityStatus: 'idle', title: "JS", status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", entityStatus: 'idle', title: "React", status: TaskStatuses.New, todoListId: 'todoListId1', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ],
        "todolistId2": [
            { id: "1", entityStatus: 'idle', title: "bread", status: TaskStatuses.New, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "2", entityStatus: 'idle', title: "milk", status: TaskStatuses.Completed, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
            { id: "3", entityStatus: 'idle', title: "tea", status: TaskStatuses.New, todoListId: 'todoListId2', description: '', 
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low}
        ]
    };
 
    const action = RemoveTodolistAC({
        todolistId:"todolistId2"
    });
 
    const endState = tasksReducer(startState, action)
 
 
    const keys = Object.keys(endState);
 
    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
 });
 
 