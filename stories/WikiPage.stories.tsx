import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import WikiPage from '../pages/d/wiki/[pageName]';

export default {
  title: 'Pages/Detail/WikiPage',
  component: WikiPage,
} as Meta;

const Template: Story = () => {
  return <WikiPage pageName="제목" content="" />;
};

export const Default = Template.bind({});
Default.args = {};
