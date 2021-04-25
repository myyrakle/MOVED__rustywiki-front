import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import dynamic from 'next/dynamic';
import * as React from 'react';
import { useQuery } from 'react-query';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
import useApi from '../../../hooks/useApi';
import util from '../../../libs/util';

const DiffView = dynamic(import('../../../components/DiffView/DiffView'), {
  ssr: false,
});
interface IDiffPageProps {
  pageName: string;
  rev: string;
}

const DiffPage: React.FunctionComponent<IDiffPageProps> = ({
  pageName,
  rev,
}) => {
  const api = useApi();

  const { data } = useQuery(
    ['history', rev],
    () => api.doc.getDocumentHistoryDetail(rev),
    { keepPreviousData: true }
  );
  return (
    <DefaultLayout>
      <PageContainer title={pageName}>
        <DiffView
          prev={data?.prev_history?.content}
          next={data?.current_history?.content}
        />
      </PageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IDiffPageProps>> {
  const pageName = util.getPageName(ctx.query);
  const rev = util.getQueryItem(ctx.query?.rev);
  return {
    props: {
      pageName,
      rev,
    },
  };
}

export default DiffPage;
