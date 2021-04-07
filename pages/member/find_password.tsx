import { css } from '@emotion/react';
import { Button, TextField } from '@material-ui/core';
import * as React from 'react';
import DefaultLayout from '../../components/DefaultLayout';
import NormalPageContainer from '../../components/NormalPageContainer';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IFindPasswordPageProps {}

const FindPasswordPage: React.FunctionComponent<IFindPasswordPageProps> = () => {
  return (
    <DefaultLayout>
      <NormalPageContainer title="아이디/패스워드 찾기">
        <form
          css={css`
            margin: auto;
            width: 400px;
          `}
        >
          <TextField
            label="이메일"
            type="email"
            fullWidth
            variant="outlined"
            autoFocus
          />
          <div
            css={css`
              margin-top: 10px;
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button color="primary" variant="contained">
              찾기
            </Button>
          </div>
        </form>
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export default FindPasswordPage;
