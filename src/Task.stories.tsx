import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions'
import { Task, TaskPropsType } from './features/todolistList/todolist/task/Task';
import { TaskStatuses, TaskPriorities } from './api/todolist-api';


export default {
  title: 'Todolist/Task',
  component: Task,
} as Meta;

const removeCallback = action('Remove Button inside Task clicked')
const changeStatusCallback = action('Status changed inside Task')
const changeTitleCallback = action('Title changed inside Task')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
  removeTask: removeCallback,
  changeTaskStatus: changeStatusCallback,
  changeTaskTitle: changeTitleCallback,
}

export const isNotCompletedTask = Template.bind({});
isNotCompletedTask.args = {
  id:'todoListId1',
  task: {id:'1',entityStatus: 'idle',title:'CSS',status: TaskStatuses.Completed, todoListId: 'todoListId1', description: '', 
  startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
  ...baseArgs,
};
export const CompletedTask = Template.bind({});
CompletedTask.args = {
  id:'todoListId2',
  task: {id:'1',entityStatus: 'idle',title:'JS', status: TaskStatuses.New, todoListId: 'todoListId1', description: '', 
  startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low},
  ...baseArgs,
};

