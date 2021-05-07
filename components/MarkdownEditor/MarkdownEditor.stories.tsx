import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import MarkdownEditor from './MarkdownEditor';

export default {
  title: 'Components/RichEditor',
  component: MarkdownEditor,
} as Meta;

const Template: Story = (args) => {
  return <MarkdownEditor {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
