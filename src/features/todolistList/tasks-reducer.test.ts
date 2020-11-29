import { TaskStatuses, TaskPriorities } from '../../api/todolist-api';
import { AddTodolistAC } from './todolists-reducer';
import { addTaskAC, removeTaskAC, tasksReducer, updateTaskAC } from './tasks-reducer';
import {TasksStateType} from '../../app/App';
let startState: TasksStateType

beforeEach(()=>{
    startState = {
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
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
        ]
     };
})
test('correct task should be deleted from correct array', () => { 

    const action = removeTaskAC("2", "todolistId2");
  
   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"].length).toBe(3);
   expect(endState["todolistId2"].length).toBe(2);
   expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
   
     const action = addTaskAC({ 
         id: "id", 
         title: "juce", 
         status: TaskStatuses.New, 
         todoListId: "todolistId2", 
         description: '', 
         startDate: '', 
         deadline: '', 
         addedDate: '', 
         order: 0,
         priority: 0
    });
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][3].id).toBeDefined();
    expect(endState["todolistId2"][3].title).toBe("juce");
    expect(endState["todolistId2"][3].status).toBe(TaskStatuses.New);
 })
 test('status of specified task should be changed', () => {
    
    const action = updateTaskAC("2", { status: TaskStatuses.New }, "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  });
 test('title of specified task should be changed', () => {
     
    const action = updateTaskAC("2", { title: "Cola" }, "todolistId2");
 
    const endState = tasksReducer(startState, action)
 
    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("Cola");
  });
  test('new array should be added when new todolist is added', () => {
     
    const action = AddTodolistAC({id: 'any', title: "new todolist", addedDate:'', order:0 });
 
    const endState = tasksReducer(startState, action)
  
    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !=="todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }
 
    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
 });
 
 
