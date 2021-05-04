import { css } from '@emotion/react';
import { Button, TextField } from '@material-ui/core';
import dayjs from 'dayjs';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useInfiniteQuery, useMutation } from 'react-query';
import DebateCard from '../../../components/DebateCard/DebateCard';
import DefaultLayout from '../../../components/DefaultLayout';
import NormalPageContainer from '../../../components/NormalPageContainer';
import useApi from '../../../hooks/useApi';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import util from '../../../libs/util';

interface IThreadPageProps {
  pageName: string;
  debate_id: string;
}

const ThreadPage: React.FunctionComponent<IThreadPageProps> = ({
  pageName,
  debate_id,
}) => {
  const api = useApi();
  const { control, handleSubmit, reset } = useForm();
  const { data, refetch } = useInfiniteQuery(
    [QUERY_KEY.DEBATE, pageName, debate_id],
    () => api.doc.getDebate({ debate_id })
  );

  const { mutateAsync } = useMutation(
    [QUERY_KEY.DEBATE, pageName, debate_id],
    (content: string) =>
      api.doc.registerDebateComment({ debate_id: Number(debate_id), content })
  );

  const onSubmit = async (formValues: { content: string }) => {
    reset();
    await mutateAsync(formValues.content);
    await refetch();
  };

  const commentList = React.useMemo(
    () => data?.pages?.map((v) => v.comment_list).flat(),
    [data]
  );

  const debate = React.useMemo(() => data?.pages?.[0]?.debate, [data]);

  return (
    <DefaultLayout>
      <NormalPageContainer title={pageName}>
        <h2>{debate?.subject}</h2>
        {debate && (
          <DebateCard
            id={1}
            registerDate={dayjs.unix(debate.reg_utc).toDate()}
            writerName={debate.writer_name}
            content={debate.content}
          />
        )}
        {commentList?.map(
          (v, i) =>
            v && (
              <DebateCard
                key={v.id}
                id={i + 2}
                registerDate={dayjs.unix(v.reg_utc).toDate()}
                writerName={v.writer_name}
                content={v.content}
              />
            )
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            css={css`
              margin-top: 40px;
            `}
          >
            <Controller
              name="content"
              control={control}
              rules={{ required: '내용을 입력해주세요.' }}
              render={({ field, fieldState }) => (
                <TextField
                  name="content"
                  fullWidth
                  multiline
                  placeholder="토론내용을 입력하세요"
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                  label="댓글"
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
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IThreadPageProps>> {
  const pageName = util.getPageName(ctx.query);
  const debate_id = util.getQueryItem(ctx.query?.debate_id);
  return {
    props: {
      pageName,
      debate_id,
    },
  };
}

export default ThreadPage;
