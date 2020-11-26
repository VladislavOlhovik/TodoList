import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { AddItemFormPropsType } from './AddItemForm';
import { AddItemForm } from './AddItemForm';
import {action} from '@storybook/addon-actions'

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    addItem:(title:string)=>{},
  },
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;

export const BaseExample = Template.bind({});
BaseExample.args = {
    addItem:action('Button inside form clicked')
};

