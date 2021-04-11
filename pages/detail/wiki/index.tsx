import { GetServerSidePropsResult } from 'next';
import * as React from 'react';
import DefaultLayout from '../../../components/DefaultLayout';
import { ROUTES } from '../../../libs/const/routes';

const WikiPage: React.FunctionComponent<null> = () => {
  return <DefaultLayout />;
};

export async function getServerSideProps(): Promise<
  GetServerSidePropsResult<any>
> {
  return { redirect: { permanent: false, destination: ROUTES.MAIN } };
}

export default WikiPage;
