import { css } from '@emotion/react';
import { Button, TextField } from '@material-ui/core';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import Link from 'next/link';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useInfiniteQuery } from 'react-query';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
import useApi from '../../../hooks/useApi';
import { DebateType } from '../../../libs/api/types/DebateResponse.type';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import { ROUTES } from '../../../libs/const/routes';
import util from '../../../libs/util';

interface IDebatePageProps {
  pageName: string;
}

type FormType = {
  subject: string;
  content: string;
};

const DebatePage: React.FunctionComponent<IDebatePageProps> = ({
  pageName,
}) => {
  const { control, handleSubmit } = useForm<FormType>();
  const api = useApi();
  const { enqueueSnackbar } = useSnackbar();

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
      <PageContainer title={pageName}>
        <h2>토론</h2>
        <ul>
          {list?.map((v) => (
            <li key={v.id}>
              <Link
                href={{
                  pathname: ROUTES.THREAD,
                  query: { pageName, debate_id: v.id },
                }}
              >
                {v.subject}
              </Link>
            </li>
          ))}
        </ul>

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
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IDebatePageProps>> {
  const pageName = util.getPageName(ctx.query);
  return {
    props: {
      pageName,
    },
  };
}

export default DebatePage;
