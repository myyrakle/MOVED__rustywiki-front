import Axios from 'axios'
import util from '../util'
import { AuthApi } from './AuthApi'
import { UserApi } from './UserApi'

class Api {
  axios = Axios.create({
    baseURL: '/api',
    withCredentials: true,
  })

  auth: AuthApi
  user: UserApi

  constructor() {
    this.auth = new AuthApi(this.axios)
    this.user = new UserApi(this.axios)
    this.axios.defaults.headers = { 'Content-Type': 'application/json' }

    if (util.isServer()) {
      return
    }
    // this.axios.interceptors.request.use((config) => {})

    this.axios.interceptors.response.use(
      (res) => {
        if (!res.data.success) {
          return Promise.reject({
            ...res.data,
          })
        }
        return res
      },
      () => {
        // console.log(err)
      }
    )
  }
}

const api = new Api()

export default api
