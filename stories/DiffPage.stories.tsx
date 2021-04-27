import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DiffPage from '../pages/d/diff/[pageName]';

export default {
  title: 'Pages/Detail/DiffPage',
  component: DiffPage,
} as Meta;

const Template: Story = () => {
  return <DiffPage pageName="제목" rev="1" />;
};

export const Default = Template.bind({});
Default.args = {};
