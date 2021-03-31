import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import DefaultLayout, { IDefaultLayoutProps } from './DefaultLayout'

export default {
  title: 'Components/DefaultLayout',
  component: DefaultLayout,
} as Meta

const Template: Story<IDefaultLayoutProps> = (args) => (
  <DefaultLayout {...args} />
)

export const Default = Template.bind({})
Default.args = {}
