import { css } from '@emotion/react'
import { Button, FormControl, TextField } from '@material-ui/core'
import * as React from 'react'
import DefaultLayout from '../../components/DefaultLayout'
import NormalPageContainer from '../../components/NormalPageContainer'
import { Controller, useForm } from 'react-hook-form'
import api from '../../libs/api'
import { useRouter } from 'next/dist/client/router'
import { routes } from '../../libs/const/routes'

const spacing = css`
  margin-top: 10px;
`

type SingUpForm = {
  email: string
  password: string
  passwordCheck: string
  nickname: string
}

const SignUpPage: React.FunctionComponent<null> = () => {
  const { control, handleSubmit, getValues, setError } = useForm<SingUpForm>()
  const router = useRouter()

  const [loading, setLoading] = React.useState(false)

  const submit = React.useCallback(async (v: SingUpForm) => {
    try {
      await api.auth.signUp(v.email, v.password, v.nickname)
      router.replace({
        path: routes.signUpSuccess,
        query: {
          email: v.email,
        },
      })
    } catch (error) {
      if (error.email_duplicated) {
        setError('email', { message: '이메일이 중복되었습니다.' })
      }
    } finally {
      setLoading(false)
    }
  }, [])

  return (
    <DefaultLayout>
      <NormalPageContainer title="회원가입">
        <form
          css={css`
            margin: auto;
            max-width: 400px;
          `}
          onSubmit={handleSubmit(submit)}
          noValidate
        >
          <FormControl fullWidth>
            <Controller
              name="email"
              control={control}
              render={(p) => {
                return (
                  <TextField
                    label="이메일"
                    type="email"
                    fullWidth
                    variant="outlined"
                    onChange={p.field.onChange}
                    onBlur={p.field.onBlur}
                    helperText={p.fieldState.error?.message}
                    autoFocus
                    error={p.fieldState.invalid}
                  />
                )
              }}
              rules={{
                required: '이메일을 입력해주세요.',
                maxLength: {
                  value: 200,
                  message: '200자 이상 입력 불가능합니다.',
                },
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: '올바른 이메일 포맷을 입력해주세요.',
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="password"
              control={control}
              render={(p) => {
                return (
                  <TextField
                    css={spacing}
                    label="패스워드"
                    fullWidth
                    variant="outlined"
                    type="password"
                    onBlur={p.field.onBlur}
                    onChange={p.field.onChange}
                    error={p.fieldState.invalid}
                    helperText={
                      p.fieldState.invalid
                        ? p.fieldState.error?.message
                        : p.fieldState.isDirty
                        ? ''
                        : '10자이상 입력해주세요.'
                    }
                  />
                )
              }}
              rules={{
                required: '패스워드를 입력해주세요',
                minLength: {
                  value: 10,
                  message: '10자 이상 입력해주세요.',
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="passwordCheck"
              control={control}
              render={(p) => {
                return (
                  <TextField
                    css={spacing}
                    label="패스워드 확인"
                    fullWidth
                    variant="outlined"
                    type="password"
                    onChange={p.field.onChange}
                    onBlur={p.field.onBlur}
                    error={p.fieldState.invalid}
                    helperText={p.fieldState.error?.message}
                  />
                )
              }}
              rules={{
                required: true,
                validate(v) {
                  const formVal = getValues()
                  return formVal.password === v
                    ? true
                    : '패스워드가 일치하지 않습니다.'
                },
              }}
            />
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="nickname"
              control={control}
              render={(p) => {
                return (
                  <TextField
                    css={spacing}
                    label="닉네임"
                    fullWidth
                    variant="outlined"
                    onChange={p.field.onChange}
                    onBlur={p.field.onBlur}
                    error={p.fieldState.invalid}
                    helperText={p.fieldState.error?.message}
                  />
                )
              }}
              rules={{
                required: '닉네임을 입력해주세요.',
                maxLength: { value: 30, message: '닉네임은 최대 30자입니다.' },
                minLength: {
                  value: 2,
                  message: '닉네임은 최소 2글자 이상 입력해주세요.',
                },
              }}
            />
          </FormControl>
          <div
            css={css`
              ${spacing}
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button
              disabled={loading}
              type="submit"
              color="primary"
              variant="contained"
            >
              회원 가입
            </Button>
          </div>
        </form>
      </NormalPageContainer>
    </DefaultLayout>
  )
}

export default SignUpPage
