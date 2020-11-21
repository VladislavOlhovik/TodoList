import  Axios  from 'axios';

const instance = Axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "9209cc73-1dd6-4bef-bbf6-e01b3e14b107",
    },
})

export type TodolistType = {
    addedDate: string
    id: string
    order: number
    title: string
}
type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgenty = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetResponseTaskType = {
    item:TaskType[]
    totalCount:number
    error:string |  null
}
type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}
 

export const todolistAPI = {
    getTodolists(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title:string){
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists',{title:title})
    },
    deleteTodolist(id:string){
        return instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolistTitle(id:string,title:string){
        return instance.put<ResponseType>(`todo-lists/${id}`, {title:title})
    },
    getTasksTodolist(todolistId:string){
        return instance.get<GetResponseTaskType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string){
        return instance.post<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks`,{title:title})
    },
    updateTaskTitle(todolistId:string, taskId:string, model:UpdateTaskModelType ){
        return instance.put<ResponseType<{item:TaskType}>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    deleteTask(todolistId:string, taskId:string){
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}