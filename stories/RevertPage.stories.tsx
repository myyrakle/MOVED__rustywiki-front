import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RevertPage, { IRevertPageProps } from '../pages/d/revert/[pageName]';
import { ApiProvider } from '../hooks/useApi';

export default {
  title: 'Pages/Detail/RevertPage',
  component: RevertPage,
} as Meta;

const Template: Story<IRevertPageProps> = () => {
  return <RevertPage pageName="제목" />;
};

export const Default = Template.bind({});
Default.args = {};

export const ApiMocking = (): React.ReactNode => (
  <ApiProvider
    doc={
      {
        async getDocumentHistoryDetail() {
          return {
            current_history: {
              id: 'historyId',
              content: '상세역사조회 API 응답결과의 현재역사 content값',
            },
          } as any;
        },
        async rollbackHistory() {
          return {} as any;
        },
      } as any
    }
  >
    <Template pageName="제목" />
  </ApiProvider>
);
ApiMocking.args = {};
