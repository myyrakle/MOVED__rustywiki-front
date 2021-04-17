import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SearchPage from '../pages/search';

export default {
  title: 'Pages/SearchPage',
  component: SearchPage,
} as Meta;

const Template: Story = () => {
  return <SearchPage />;
};

export const Default = Template.bind({});
Default.args = {};
