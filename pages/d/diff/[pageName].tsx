import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import * as React from 'react';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
// import { useQuery } from 'react-query';
// import RevisionTable from '../../../components/RevisionTable';
// import useApi from '../../../hooks/useApi';
import util from '../../../libs/util';

interface IDiffPageProps {
  pageName: string;
}

const DiffPage: React.FunctionComponent<IDiffPageProps> = ({ pageName }) => {
  //   const [page, setPage] = React.useState(1);
  //   const api = useApi();

  //   const { data } = useQuery(
  //     ['history', page],
  //     () => api.doc.getDocumentHistory(pageName, page),
  //     { keepPreviousData: true }
  //   );
  return (
    <DefaultLayout>
      <PageContainer title={pageName}>diff</PageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IDiffPageProps>> {
  const pageName = util.getPageName(ctx.query);
  return {
    props: {
      pageName,
    },
  };
}

export default DiffPage;
