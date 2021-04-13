import { useRouter } from 'next/router';
import * as React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { ROUTES } from '../libs/const/routes';

const MainPage = (): JSX.Element => {
  const router = useRouter();
  React.useEffect(() => {
    router.replace({ pathname: ROUTES.MAIN });
  }, []);
  return <DefaultLayout />;
};

export default MainPage;
