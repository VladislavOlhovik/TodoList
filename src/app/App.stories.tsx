import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import AppWithRedux from './App';
import { ReduxStoreProviderDecorator } from '../stories/decorators/ReduxStoreProviderDecorator';

export default {
  title: 'Todolist/App',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = () =><AppWithRedux />;

export const BaseExample = Template.bind({});
BaseExample.args = {
};