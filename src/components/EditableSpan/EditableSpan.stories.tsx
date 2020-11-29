import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions'
import { EditableSpan, EditableSpanPropsType } from './EditableSpan';

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const BaseExample = Template.bind({});
BaseExample.args = {
    disabled:false,
    isDone:false,
    title:'React',
    onChange:action('title inside form clicked'),
};