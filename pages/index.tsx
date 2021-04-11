import { GetServerSidePropsResult } from 'next';
import * as React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { ROUTES } from '../libs/const/routes';

const MainPage = (): JSX.Element => {
  return <DefaultLayout />;
};

export function getServerSideProps(): GetServerSidePropsResult<any> {
  return {
    redirect: {
      destination: ROUTES.MAIN,
      permanent: false,
    },
  };
}

export default MainPage;
