import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DebatePage, { IDebatePageProps } from '../pages/d/debate/[pageName]';
import { ApiProvider } from '../hooks/useApi';
import { DebateType } from '../libs/api/types/DebateResponse.type';
import faker from 'faker';
// import faker from "faker";

export default {
  title: 'Pages/Detail/DebatePage',
  component: DebatePage,
} as Meta;

const Template: Story<IDebatePageProps> = (args) => {
  return <DebatePage {...args} />;
};

export const Default = Template.bind({});

Default.decorators = [
  (Story) => (
    <ApiProvider
      doc={
        {
          async getDebateList() {
            const list: DebateType[] = Array(10)
              .fill('')
              .map(
                () =>
                  ({
                    subject: faker.lorem.sentence(),
                    id: faker.datatype.number(),
                  } as any)
              );
            return { list } as any;
          },
          async registerDebate() {
            return {};
          },
        } as any
      }
    >
      <Story />
    </ApiProvider>
  ),
];
Default.args = {
  pageName: '제목',
  openYn: true,
};

export const ClosedList = Template.bind({});

ClosedList.decorators = [
  (Story) => (
    <ApiProvider
      doc={
        {
          async getDebateList() {
            const list: DebateType[] = Array(10)
              .fill('')
              .map(
                () =>
                  ({
                    subject: faker.lorem.sentence(),
                    id: faker.datatype.number(),
                  } as any)
              );
            return { list } as any;
          },
          async registerDebate() {
            return {};
          },
        } as any
      }
    >
      <Story />
    </ApiProvider>
  ),
];

ClosedList.args = {
  pageName: '제목',
  openYn: false,
};
