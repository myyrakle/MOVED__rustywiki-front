import { css } from '@emotion/react'
import { Button, TextField } from '@material-ui/core'
import * as React from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import NormalPageContainer from '../../components/NormalPageContainer'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface ISignUpPageProps {}

const spacing = css`
  margin-top: 10px;
`

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = () => {
  return (
    <DefaultLayout>
      <NormalPageContainer title="회원가입">
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
          <TextField
            css={spacing}
            label="패스워드"
            fullWidth
            variant="outlined"
            type="password"
          />
          <TextField
            css={spacing}
            label="패스워드 확인"
            fullWidth
            variant="outlined"
            type="password"
          />
          <TextField
            css={spacing}
            label="닉네임"
            fullWidth
            variant="outlined"
          />
          <div
            css={css`
              ${spacing}
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button color="primary" variant="contained">
              회원 가입
            </Button>
          </div>
        </form>
      </NormalPageContainer>
    </DefaultLayout>
  )
}

export default SignUpPage
