import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ToolBarGroup, { IToolbarGroupProps } from './ToolBarGroup';

export default {
  title: 'Components/ToolBarGroup',
  component: ToolBarGroup,
} as Meta;

const Template: Story<IToolbarGroupProps> = (args) => (
  <ToolBarGroup {...args} />
);

export const Default = Template.bind({});
Default.args = {
  pageName: 'testPath',
};
