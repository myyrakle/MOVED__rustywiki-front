import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import SearchBar, { ISearchBarProps } from './SearchBar';

export default {
  title: 'Components/SearchBar',
  component: SearchBar,
} as Meta;

const Template: Story<ISearchBarProps> = (args) => <SearchBar {...args} />;

export const Default = Template.bind({});
Default.args = {};
