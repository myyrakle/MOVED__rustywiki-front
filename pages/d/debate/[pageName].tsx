import { css } from '@emotion/react';
import { Button, TextField } from '@material-ui/core';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useInfiniteQuery } from 'react-query';
import DefaultLayout from '../../../components/DefaultLayout';
import NormalPageContainer from '../../../components/NormalPageContainer';
import PageContainer from '../../../components/PageContainer';
import useApi from '../../../hooks/useApi';
import { DebateType } from '../../../libs/api/types/DebateResponse.type';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import { ROUTES } from '../../../libs/const/routes';
import util from '../../../libs/util';
import DebateList from '../../../components/DebateList/DebateList';

export interface IDebatePageProps {
  pageName: string;

  /** 토론 열림여부 */
  openYn: boolean;
}

type FormType = {
  subject: string;
  content: string;
};

const DebatePage: React.FunctionComponent<IDebatePageProps> = ({
  pageName,
  openYn,
}) => {
  const { control, handleSubmit } = useForm<FormType>();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();

  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    [QUERY_KEY.DEBATE, pageName, openYn],
    (ctx) =>
      api.doc.getDebateList({
        open_yn: openYn,
        document_title: pageName,
        next_token: ctx.queryKey,
      }),
    {
      getNextPageParam(lastPage) {
        return lastPage.has_next ? lastPage.next_token : undefined;
      },
    }
  );

  const { mutateAsync } = useMutation(
    [QUERY_KEY.DEBATE, pageName],
    (values: FormType) =>
      api.doc.registerDebate({
        document_title: pageName,
        subject: values.subject,
        content: values.content,
      })
  );

  const list = React.useMemo(() => {
    return data?.pages?.reduce<DebateType[]>((pre, cur) => {
      return pre.concat(cur.list);
    }, []);
  }, [data?.pages]);

  return (
    <DefaultLayout>
      {openYn && (
        <PageContainer title={pageName}>
          <h2>토론</h2>

          <DebateList
            hasNextPage={!!hasNextPage}
            pageName={pageName}
            list={list}
            isFetchingNextPage={isFetchingNextPage}
            onFetchNext={() => fetchNextPage()}
          />

          {list?.length === 0 && '열린 토론 목록이 존재하지 않습니다.'}
          <Link
            href={{
              pathname: ROUTES.DEBATE,
              query: { open_yn: false, pageName },
            }}
          >
            [닫힌 토론 보기]
          </Link>

          <hr
            css={css`
              margin: 30px 0;
            `}
          />
          <h2>새 주제 생성</h2>
          <form
            onSubmit={handleSubmit(async ({ subject, content }: FormType) => {
              // eslint-disable-next-line no-console
              await mutateAsync({ subject, content });
              enqueueSnackbar('토론을 등록했습니다.', {
                variant: 'success',
                autoHideDuration: 3000,
              });
            })}
          >
            <div>
              <Controller
                name="subject"
                control={control}
                rules={{ required: '주제를 입력해주세요.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    name="subject"
                    css={css`
                      width: 300px;
                    `}
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    label="주제"
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <Controller
                name="content"
                control={control}
                rules={{ required: '주제를 입력해주세요.' }}
                render={({ field, fieldState }) => (
                  <TextField
                    name="content"
                    fullWidth
                    multiline
                    error={!!fieldState.error?.message}
                    helperText={fieldState.error?.message}
                    label="내용"
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
            <div
              css={css`
                text-align: center;
                margin-top: 20px;
              `}
            >
              <Button type="submit" variant="contained">
                등록
              </Button>
            </div>
          </form>
        </PageContainer>
      )}

      {!openYn && (
        <NormalPageContainer title={`${pageName} (닫힌 토론)`}>
          <ul>
            {list?.length !== 0 && (
              <DebateList
                hasNextPage={!!hasNextPage}
                pageName={pageName}
                list={list}
                isFetchingNextPage={isFetchingNextPage}
                onFetchNext={() => fetchNextPage()}
              />
            )}
            {list?.length === 0 && '닫힌 토론 목록이 존재하지 않습니다.'}
          </ul>
        </NormalPageContainer>
      )}
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IDebatePageProps>> {
  const pageName = util.getPageName(ctx.query);
  const openYn = util.getQueryItem(ctx.query?.open_yn);
  return {
    props: {
      pageName,
      openYn: openYn !== 'false',
    },
  };
}

export default DebatePage;
