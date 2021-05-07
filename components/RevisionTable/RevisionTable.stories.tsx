import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RevisionTable, { IRevisionTableProps } from './RevisionTable';

export default {
  title: 'Components/RevisionTable',
  component: RevisionTable,
} as Meta;

const Template: Story<IRevisionTableProps> = (args) => {
  return <RevisionTable {...args} />;
};

export const Default = Template.bind({});
Default.args = {};
