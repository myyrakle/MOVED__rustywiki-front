import { AxiosInstance } from 'axios'
import type { DefaultResponse } from './DefaultResponse.type'

type SignUpResponse = DefaultResponse & {
  email_duplicated: boolean
  token: string
}

type LoginResponse = DefaultResponse & {
  login_failed: boolean
  token: string
}

export class AuthApi {
  constructor(private axios: AxiosInstance) {}

  async signUp(
    email: string,
    password: string,
    nickname: string
  ): Promise<SignUpResponse> {
    const { data } = await this.axios.post<SignUpResponse>('/auth/signup', {
      email,
      password,
      nickname,
    })
    return data
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const { data } = await this.axios.post<LoginResponse>('/auth/login', {
      email,
      password,
    })
    return data
  }
}
