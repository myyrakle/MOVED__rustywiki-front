import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
import api from '../../../libs/api';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import { ROUTES } from '../../../libs/const/routes';
import util from '../../../libs/util';

interface IWikiPageProps {
  pageName: string;
}

const WikiPage: React.FunctionComponent<IWikiPageProps> = (props) => {
  const { pageName } = props;

  const { data } = useQuery([QUERY_KEY.DOC, pageName], () =>
    api.doc.getDocument(pageName)
  );

  return (
    <DefaultLayout>
      <PageContainer title={pageName}>{data?.content}</PageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
    pageName: string;
  }>
> {
  const queryClient = new QueryClient();

  const pageName = util.getPageName(context?.query);
  if (!pageName) {
    return { redirect: { permanent: false, destination: ROUTES.MAIN } };
  }

  await queryClient.prefetchQuery([QUERY_KEY.DOC, pageName], () =>
    api.doc.getDocument(pageName)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageName,
    },
  };
}

export default WikiPage;
