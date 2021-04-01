import { css } from '@emotion/react'
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core'
import Link from 'next/link'
import * as React from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import NormalPageContainer from '../../components/NormalPageContainer'
import { routes } from '../../libs/const/routes'

const LoginPage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <NormalPageContainer title="로그인">
        <div
          css={css`
            display: flex;
            justify-content: center;
          `}
        >
          <form
            css={css`
              max-width: 400px;
              width: 100%;
            `}
          >
            <div>
              <TextField
                autoFocus
                fullWidth
                id="id-field"
                name="id"
                label="ID"
                variant="outlined"
              />
            </div>
            <div
              css={css`
                margin-top: 10px;
              `}
            >
              <TextField
                fullWidth
                id="password-field"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
              />
            </div>
            <div
              css={css`
                display: flex;
                justify-content: space-between;
                align-items: center;
              `}
            >
              <FormControlLabel
                label={
                  <span
                    css={css`
                      font-size: 14px;
                    `}
                  >
                    자동 로그인
                  </span>
                }
                control={<Checkbox />}
              />
              <Link href={routes.findPassword}>[아이디/비밀번호 찾기]</Link>
            </div>
            <div
              css={css`
                display: flex;
                justify-content: flex-end;
                width: 100%;
                > * + * {
                  margin-left: 5px;
                }
              `}
            >
              <Link href={routes.signUp}>
                <Button size="small">회원가입</Button>
              </Link>
              <Button size="small" variant="contained" color="primary">
                로그인
              </Button>
            </div>
          </form>
        </div>
      </NormalPageContainer>
    </DefaultLayout>
  )
}

export default LoginPage
