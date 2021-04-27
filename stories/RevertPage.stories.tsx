import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RevertPage from '../pages/d/revert/[pageName]';

export default {
  title: 'Pages/Detail/RevertPage',
  component: RevertPage,
} as Meta;

const Template: Story = () => {
  return <RevertPage pageName="제목" />;
};

export const Default = Template.bind({});
Default.args = {};
