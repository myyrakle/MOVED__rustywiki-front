import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import * as React from 'react';
import { useQuery } from 'react-query';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
import RevisionTable from '../../../components/RevisionTable';
import useApi from '../../../hooks/useApi';
import util from '../../../libs/util';
interface IHistoriesPageProps {
  pageName: string;
}

const HistoriesPage: React.FunctionComponent<IHistoriesPageProps> = ({
  pageName,
}) => {
  const [page, setPage] = React.useState(1);
  const api = useApi();

  const { data } = useQuery(
    ['history', page],
    () => api.doc.getDocumentHistory(pageName, page),
    { keepPreviousData: true }
  );
  return (
    <DefaultLayout>
      <PageContainer title={pageName}>
        <RevisionTable
          response={data}
          onChangePage={(current) => setPage(current)}
        />
      </PageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IHistoriesPageProps>> {
  const pageName = util.getPageName(ctx.query);
  return {
    props: {
      pageName,
    },
  };
}

export default HistoriesPage;
