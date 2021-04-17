import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import EditPage from '../pages/d/edit/[pageName]';

export default {
  title: 'Pages/Detail/EditPage',
  component: EditPage,
} as Meta;

const Template: Story = () => {
  return <EditPage pageName="제목" />;
};

export const Default = Template.bind({});
Default.args = {};
