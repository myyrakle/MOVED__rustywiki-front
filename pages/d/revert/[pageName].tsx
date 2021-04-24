import { css } from '@emotion/react';
import { Button } from '@material-ui/core';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import DefaultLayout from '../../../components/DefaultLayout';
import NormalPageContainer from '../../../components/NormalPageContainer';
import TitleLink from '../../../components/TitleLink/TitleLink';
import useApi from '../../../hooks/useApi';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import { ROUTES } from '../../../libs/const/routes';
import util from '../../../libs/util';

interface IRevertPageProps {
  pageName: string;
}

const RevertPage: React.FunctionComponent<IRevertPageProps> = ({
  pageName,
}) => {
  const router = useRouter();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const rev = util.getQueryItem(router.query?.rev);
  const { data } = useQuery(
    [QUERY_KEY.HISTORY, pageName, rev],
    () => api.doc.getDocumentHistoryDetail(rev ?? 0),
    { keepPreviousData: true }
  );

  const { mutateAsync } = useMutation(
    [QUERY_KEY.HISTORY, rev],
    (historyId: string) => api.doc.rollbackHistory(historyId)
  );

  return (
    <DefaultLayout>
      <NormalPageContainer
        title={
          <div>
            <TitleLink pageName={pageName} />
            <small>({rev}로 되돌리기)</small>
          </div>
        }
      >
        <textarea
          css={css`
            width: 100%;
          `}
          readOnly
          value={data?.current_history?.content}
        ></textarea>

        <div
          css={css`
            text-align: center;
            margin-top: 15px;
          `}
        >
          <Button
            variant="contained"
            onClick={async () => {
              await mutateAsync(rev);
              enqueueSnackbar('해당 리비전으로 되돌렸습니다.', {
                variant: 'success',
                autoHideDuration: 3000,
              });
              router.push({ pathname: ROUTES.WIKI, query: { pageName } });
            }}
          >
            되돌리기
          </Button>
        </div>
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IRevertPageProps>> {
  const pageName = util.getPageName(ctx.query);
  return {
    props: {
      pageName,
    },
  };
}

export default RevertPage;
