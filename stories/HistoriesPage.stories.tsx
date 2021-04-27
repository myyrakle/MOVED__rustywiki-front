import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import HistoriesPage from '../pages/d/histories/[pageName]';

export default {
  title: 'Pages/Detail/Histories',
  component: HistoriesPage,
} as Meta;

const Template: Story = () => {
  return <HistoriesPage pageName="제목" />;
};

export const Default = Template.bind({});
Default.args = {};
