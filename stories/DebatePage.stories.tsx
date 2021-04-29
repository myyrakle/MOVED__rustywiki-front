import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import DebatePage from '../pages/d/debate/[pageName]';
import { ApiProvider } from '../hooks/useApi';
import { DebateType } from '../libs/api/types/DebateResponse.type';
import faker from 'faker';
// import faker from "faker";

export default {
  title: 'Pages/Detail/DebatePage',
  component: DebatePage,
} as Meta;

const Template: Story = () => {
  return <DebatePage pageName="제목" />;
};

export const Default = (): React.ReactNode => (
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
    <Template />
  </ApiProvider>
);
Default.args = {};
