import { AddTodolistAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer, ChangeTodolistFilterAC, TodolistDomainType, filtersValueType } from './todolists-reducer';
import {v1} from 'uuid';
   
let todolistId1: string
let todolistId2: string
let startState: Array<TodolistDomainType>

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, entityStatus: 'idle', title: "What to learn", filter: "all", addedDate:'', order:0 },
        {id: todolistId2, entityStatus: 'idle', title: "What to buy", filter: "all", addedDate:'', order:0 }
    ]
})

test('correct todolist should be removed', () => {   

   const endState = todolistsReducer(startState,RemoveTodolistAC(todolistId1))

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    
    let todolist = {id: "any", title: "New Todolist", addedDate:'', order:0 };
 
    const endState = todolistsReducer(startState, AddTodolistAC(todolist))
 
    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todolist.title);
 });
 test('correct todolist should change its name', () => {
    
    let newTodolistTitle = "New Todolist";   
 
    const endState = todolistsReducer(startState, ChangeTodolistTitleAC(todolistId2,newTodolistTitle));
 
    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
 });

 test('correct filter of todolist should be changed', () => {
    
    let newFilter: filtersValueType = "completed";   

    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2,newFilter));
 
    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
 });
 
