import { css } from '@emotion/react';
import * as React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import NormalPageContainer from '../../components/NormalPageContainer';
import { useRouter } from 'next/router';
import { ROUTES } from '../../libs/const/routes';

const SignUpSuccessPage: React.FunctionComponent<null> = () => {
  const router = useRouter();
  const email = router.query?.email;
  const [mount, setMount] = React.useState(false);

  React.useEffect(() => {
    setMount(true);
    if (!email && mount) {
      router.replace(ROUTES.MAIN);
    }
  }, [router.query]);

  if (!email) {
    return <div />;
  }
  return (
    <DefaultLayout>
      <NormalPageContainer>
        <h2
          css={css`
            text-align: center;
          `}
        >
          회원가입에 성공하였습니다.
        </h2>
        <p
          css={css`
            text-align: center;
          `}
        >
          이메일({email})로 인증메일을 보냈습니다.
          <br /> 인증 완료 후 로그인 가능합니다.
        </p>
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export default SignUpSuccessPage;
