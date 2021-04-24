import { AxiosInstance } from 'axios';
import type { DefaultResponse } from './types/DefaultResponse.type';

type SignUpResponse = DefaultResponse & {
  email_duplicated: boolean;
  token: string;
};

type LoginResponse = DefaultResponse & {
  login_failed: boolean;
  refresh_token: string;
};

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
    });
    return data;
  }

  async login(email: string, password: string): Promise<LoginResponse> {
    const result = await this.axios.post<LoginResponse>('/auth/login', {
      email,
      password,
    });
    return result?.data;
  }

  async refresh(token: string): Promise<LoginResponse> {
    const result = await this.axios.put<LoginResponse>('/auth/refresh', {
      refresh_token: token,
      __isRetryRequest: true,
    });
    return result?.data;
  }

  async logout(token?: string): Promise<void> {
    await this.axios.delete<LoginResponse>('/auth/logout', {
      data: { refresh_token: token },
    });
  }
}
