import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThreadPage from '../pages/d/thread/[pageName]';

export default {
  title: 'Pages/Detail/ThreadPage',
  component: ThreadPage,
} as Meta;

const Template: Story = () => {
  return <ThreadPage pageName="제목" debate_id="1" />;
};

export const Default = Template.bind({});
Default.args = {};
