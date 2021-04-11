import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import DefaultLayout from '../../../components/DefaultLayout';
import PageContainer from '../../../components/PageContainer';
import useApi from '../../../hooks/useApi';
import { QUERY_KEY } from '../../../libs/const/queryKey';
import { ROUTES } from '../../../libs/const/routes';
import util from '../../../libs/util';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IEditPageProps {
  pageName: string;
}

const EditPage: React.FunctionComponent<IEditPageProps> = ({ pageName }) => {
  const api = useApi();
  const { data } = useQuery(
    [QUERY_KEY.DOC, pageName],
    () => api.doc.getDocument(pageName),
    { cacheTime: 0 }
  );
  const { control, handleSubmit } = useForm<{ content: string }>({
    defaultValues: { content: data?.content },
  });

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { mutateAsync } = useMutation(
    [QUERY_KEY.DOC, pageName],
    (values: { title: string; content: string }) =>
      api.doc.registerDocument(values.title, values.content)
  );

  return (
    <DefaultLayout>
      <PageContainer title={pageName}>
        <form
          onSubmit={handleSubmit(async (values) => {
            await mutateAsync({
              title: pageName,
              content: values?.content,
            });
            enqueueSnackbar('문서가 등록되었습니다.', {
              variant: 'success',
              autoHideDuration: 3000,
              anchorOrigin: { horizontal: 'center', vertical: 'top' },
            });

            router.push({
              pathname: ROUTES.WIKI,
              query: { pageName },
            });
          })}
        >
          <Controller
            name="content"
            control={control}
            render={(props) => {
              return (
                <textarea
                  cols={30}
                  rows={10}
                  value={props.field.value}
                  onChange={(e) => {
                    props.field.onChange(e.target.value);
                  }}
                />
              );
            }}
          />
          <button type="submit">test</button>
        </form>
      </PageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps({
  query,
}: GetServerSidePropsContext): Promise<
  GetServerSidePropsResult<{ pageName: string }>
> {
  const pageName = util.getPageName(query);
  return {
    props: {
      pageName,
    },
  };
}

export default EditPage;
