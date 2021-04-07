import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import PageContainer, { IPageContainerProps } from './PageContainer';

export default {
  title: 'Components/PageContainer',
  component: PageContainer,
} as Meta;

const Template: Story<IPageContainerProps> = (args) => (
  <PageContainer {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: 'Title',
  updatedAt: new Date(),
};
