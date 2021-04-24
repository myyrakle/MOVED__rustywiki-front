import { AxiosInstance } from 'axios';
import type { DefaultResponse } from './types/DefaultResponse.type';

type GetMyInfoResponse = DefaultResponse & {
  email?: string;
  nickname?: string;
  reg_time?: number;
};
export class UserApi {
  constructor(private axios: AxiosInstance) {}

  async getMyInfo(): Promise<GetMyInfoResponse> {
    const result = await this.axios.get<GetMyInfoResponse>('/user/my-info');
    return result?.data;
  }
}
