import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import SideContent, { ISideContentProps } from './SideContent'

export default {
  title: 'Components/SideContent',
  component: SideContent,
} as Meta

const Template: Story<ISideContentProps> = (args) => <SideContent {...args} />

export const Default = Template.bind({})
Default.args = {}
