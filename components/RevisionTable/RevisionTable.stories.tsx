import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RevisionTable, { IRevisionTableProps } from './RevisionTable';
// import RecentChangeList, { IRecentChangeListProps } from './RecentChangeList';

export default {
  title: 'Components/RevisionTable',
  component: RevisionTable,
} as Meta;

const Template: Story<IRevisionTableProps> = (args) => {
  return <RevisionTable {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  response: {
    total_count: 20,
    list: [
      { writer_name: 'test', id: 5, reg_utc: 123123123 },
      { writer_name: 'test', id: 4, reg_utc: 123123123 },
      { writer_name: 'test', id: 3, reg_utc: 123123123 },
      { writer_name: 'test', id: 2, reg_utc: 123123123 },
      { writer_name: 'test', id: 1, reg_utc: 123123123 },
    ],
  },
};
