import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DebateList, { IDebateListProps } from './DebateList';

export default {
  title: 'Components/DebateList',
  component: DebateList,
} as Meta;

const Template: Story<IDebateListProps> = (args) => <DebateList {...args} />;

export const Default = Template.bind({});
Default.args = {};
