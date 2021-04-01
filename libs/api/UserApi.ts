import { AxiosInstance } from 'axios'
import type { DefaultResponse } from './DefaultResponse.type'

type GetMyInfoResponse = DefaultResponse & {
  email_duplicated: boolean
  token: string
}
export class UserApi {
  constructor(private axios: AxiosInstance) {}

  async getMyInfo(): Promise<GetMyInfoResponse> {
    const { data } = await this.axios.get<GetMyInfoResponse>('/user/my-info')
    return data
  }
}
