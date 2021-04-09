import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MainPage from '../pages';

export default {
  title: 'Pages/MainPage',
  component: MainPage,
} as Meta;

const Template: Story = () => {
  return <MainPage />;
};

export const Default = Template.bind({});
Default.args = {};
