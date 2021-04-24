import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import * as React from 'react';
import DefaultLayout from '../../../components/DefaultLayout';
import NormalPageContainer from '../../../components/NormalPageContainer';
import util from '../../../libs/util';

interface IThreadPageProps {
  pageName: string;
}

const ThreadPage: React.FunctionComponent<IThreadPageProps> = ({
  pageName,
}) => {
  //   const { control, handleSubmit } = useForm();

  // const onSubmit = ;
  return (
    <DefaultLayout>
      <NormalPageContainer title={pageName}>
        <h2>thread title</h2>
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<IThreadPageProps>> {
  const pageName = util.getPageName(ctx.query);
  return {
    props: {
      pageName,
    },
  };
}

export default ThreadPage;
