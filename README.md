# Rust Wiki Front

## 관련 코드 및 서버 주소

[Wiki Server Git](https://github.com/myyrakle/rustywiki-server)

[Wiki Api Docs Git](https://github.com/myyrakle/rustywiki-api-document)

[Swagger 서버 주소](http://125.133.80.144:22222)

[개발용 백엔드 서버](http://125.133.80.144:11111) 

## 사용한 기술



react, next.js, @emotion/react, material-ui, react-query, recoil, 

storybook


## 실행 및 개발 방법

npm일시 
```
npm run dev
```


## API 없이 개발하기 위한 방법

1. storybook을 실행해주세요
```
npm run storybook
```

2. 스토리 파일을 작성해주세요

페이지 관련 스토리파일은 stories폴더안에 넣어주세요!

그외에 컴포넌트 관련 스토리컴포넌트는 컴포넌트와 함께 정의해주세요!

```tsx
// ThreadPage.stories.tsx, 페이지 스토리 작성예
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import ThreadPage from '../pages/d/thread/[pageName]';

export default {
  title: 'Pages/Detail/ThreadPage',
  component: ThreadPage,
} as Meta;

const Template: Story = () => {
  return <ThreadPage pageName="제목" debate_id="1" />;
};

export const Default = Template.bind({});
Default.args = {};
```

```tsx
// RevisionTable.stories.tsx 컴포넌트 스토리 작성예
import React from 'react';
import { Story, Meta } from '@storybook/react/types-6-0';
import RevisionTable, { IRevisionTableProps } from './RevisionTable';

export default {
  title: 'Components/RevisionTable',
  component: RevisionTable,
} as Meta;

const Template: Story<IRevisionTableProps> = (args) => {
  return <RevisionTable {...args} />;
};

export const Default = Template.bind({});
Default.args = {};


```


3. 컴포넌트를 정의할떄 api의존성은 useApi()를 통해서 정의해주세요! 
   그래야 context기반으로  Mocking한 API를 사용해서 스토리북 컴포넌트로 개발할 수 있어요! 
```tsx
// api를 그냥 가져오는것이 아니라 hook으로 주입해서 사용하고 있어요!
const DebatePage: React.FunctionComponent<IDebatePageProps> = ({
  pageName,
}) => {
  //...
  const api = useApi();
  const { data } = useInfiniteQuery(
    [QUERY_KEY.DEBATE, pageName],
    (ctx) =>
      api.doc.getDebateList({
        open_yn: true,
        document_title: pageName,
        next_token: ctx.queryKey,
      }),
    {
      getNextPageParam(lastPage) {
        return lastPage.next_token;
      },
    }
  );
```

4. 이렇게하면 DocApi를 Mocking해서 페이지 컴포넌트도 문제없이 스토리북에서 정의해서 사용할 수 있어요
  Error Case에 대한 경우까지 스토리로 쉽게 추가할 수 있어요!
```tsx
// Page.stories.tsx

import { ApiProvider } from '../hooks/useApi';

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

```