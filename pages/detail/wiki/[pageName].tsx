import * as React from 'react';
import DefaultLayout from '../../../components/DefaultLayout';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IWikiPageProps {}

const WikiPage: React.FunctionComponent<IWikiPageProps> = () => {
  return <DefaultLayout>위키페이지</DefaultLayout>;
};

export default WikiPage;
