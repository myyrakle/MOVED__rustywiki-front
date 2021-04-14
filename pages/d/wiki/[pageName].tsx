import { GetServerSidePropsResult, GetServerSidePropsContext } from 'next';
import * as React from 'react';
import { QueryClient, useQuery } from 'react-query';
import { dehydrate, DehydratedState } from 'react-query/hydration';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
import api from '../../../libs/api';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import util from '../../../libs/util';
import { customMarked } from '../../../libs/marked';
import type { GetDocumentResponse } from '../../../libs/api/DocApi';
import Link from 'next/link';
import { ROUTES } from '../../../libs/const/routes';

interface IWikiPageProps {
  pageName: string;
  content: string;
}

const WikiPage: React.FunctionComponent<IWikiPageProps> = (props) => {
  const { pageName, content } = props;

  const { data } = useQuery<GetDocumentResponse>([QUERY_KEY.DOC, pageName]);

  return (
    <DefaultLayout>
      <PageContainer title={pageName}>
        {data?.not_exists ? (
          <div>
            문서가 존재하지 않습니다.
            <div>
              <Link href={{ pathname: ROUTES.EDIT, query: { pageName } }}>
                [문서만들기]
              </Link>
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </PageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    dehydratedState: DehydratedState;
    pageName: string;
    content: string;
  }>
> {
  const queryClient = new QueryClient();

  const pageName = util.getPageName(context?.query);

  await queryClient.prefetchQuery([QUERY_KEY.DOC, pageName], () =>
    api.doc.getDocument(pageName)
  );

  const result = queryClient.getQueryData([QUERY_KEY.DOC, pageName]) as any;

  const content = customMarked.render(result?.content);
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      pageName,
      content,
    },
  };
}

export default WikiPage;
