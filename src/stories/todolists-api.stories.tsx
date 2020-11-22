import React, { useEffect, useState } from "react";
import { todolistAPI } from "../api/todolist-api";

export default {
  title: "API",
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists().then((res) => setState(res.data));
  }, []);

  return <div> {JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [value, setValue] = useState<string>("");
  const createTodolist = () => {
    todolistAPI.createTodolist(value).then((res) => setState(res.data));
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todlistTitle"}
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <button onClick={createTodolist}>addTodolist</button>
      </div>
    </div>
  );
};
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [id, setId] = useState<string>("");

  const deleteTodolist = () => {
    todolistAPI.deleteTodolist(id).then((res) => setState(res.data));
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todlistId"}
          type="text"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
        <button onClick={deleteTodolist}>deleteTodolist</button>
      </div>
    </div>
  );
};
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  const [value, setValue] = useState<string>("");
  const [id, setId] = useState<string>("");

  const updateTodolistTitle = () => {
    todolistAPI
      .updateTodolistTitle(id, value)
      .then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todlistTitle"}
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <input
          placeholder={"todlistId"}
          type="text"
          value={id}
          onChange={(e) => setId(e.currentTarget.value)}
        />
        <button onClick={updateTodolistTitle}>updateTodolist</button>
      </div>
    </div>
  );
};
export const GetTasksTodolist = () => {
  const [state, setState] = useState<any>(null);
  const [todlistId, setTodlistId] = useState<string>("");
  const getTasks = () => {
    todolistAPI.getTasksTodolist(todlistId).then((res) => setState(res.data));
  };
  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"todlistId"}
          type="text"
          value={todlistId}
          onChange={(e) => setTodlistId(e.currentTarget.value)}
        />
        <button onClick={getTasks}>getTasks</button>
      </div>
    </div>
  );
};
export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  const [value, setValue] = useState<string>("");
  const [todlistId, setTodlistId] = useState<string>("");

  const createTask = () => {
    todolistAPI.createTask(todlistId, value).then((res) => setState(res.data));
  };

  return (
    <div>
      {JSON.stringify(state)}
      <div>
        <input
          placeholder={"taskTitle"}
          type="text"
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
        />
        <input
          placeholder={"todlistId"}
          type="text"
          value={todlistId}
          onChange={(e) => setTodlistId(e.currentTarget.value)}
        />
        <button onClick={createTask}>createTask</button>
      </div>
    </div>
  );
};
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todlistId, setTodlistId] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    
    const updateTaskTitle = () => {
      todolistAPI
        .updateTask(todlistId, taskId, {
            title: title,
            description: description,
            status: status,
            priority: priority,
            startDate: '',
            deadline: '',
        })
        .then((res) => setState(res.data));
    };
  
    return (
      <div>
        {JSON.stringify(state)}
        <div>
          <input placeholder={"TaskTitle"} type="text" value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
          <input placeholder={"taskId"} type="text" value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
          <input placeholder={"todlistId"} type="text" value={todlistId} onChange={(e) => setTodlistId(e.currentTarget.value)} />
          <input placeholder={"description"} type="text" value={description} onChange={(e) => setDescription(e.currentTarget.value)} />
          <input placeholder={"status"} type="number" value={status} onChange={(e) => setStatus(+e.currentTarget.value)} />
          <input placeholder={"priority"} type="number" value={priority} onChange={(e) => setPriority(+e.currentTarget.value)} />
          <button onClick={updateTaskTitle}>updateTask</button>
        </div>
      </div>
    );
};
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>("");
    const [todlistId, setTodlistId] = useState<string>("");
  
    const deleteTask = () => {
      todolistAPI.deleteTask(todlistId, taskId).then((res) => setState(res.data));
    };
  
    return (
      <div>
        {JSON.stringify(state)}
        <div>
          <input
            placeholder={"taskId"}
            type="text"
            value={taskId}
            onChange={(e) => setTaskId(e.currentTarget.value)}
          />
          <input
            placeholder={"todlistId"}
            type="text"
            value={todlistId}
            onChange={(e) => setTodlistId(e.currentTarget.value)}
          />
          <button onClick={deleteTask}>deleteTask</button>
        </div>
      </div>
    );
  };