import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DebatePage from '../pages/d/debate/[pageName]';

export default {
  title: 'Pages/Detail/DebatePage',
  component: DebatePage,
} as Meta;

const Template: Story = () => {
  return <DebatePage pageName="제목" />;
};

export const Default = Template.bind({});
Default.args = {};
