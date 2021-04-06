import Axios from 'axios'
import { storageKey } from '../const/storageKey'
import util from '../util'
import { AuthApi } from './AuthApi'
import { UserApi } from './UserApi'

export class MainApi {
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

    this.axios.interceptors.response.use(
      (res) => {
        if (res.status === 401) {
          const token = localStorage.getItem(storageKey.refreshToken)
          if (!token) {
            return Promise.reject({
              ...res.data,
            })
          }
          return this.auth
            .refresh(token)
            .catch((err) => {
              if (!err.success) {
                localStorage.removeItem(storageKey.refreshToken)
                return Promise.reject()
              }
              return
            })
            .then(() => Axios.request(res.config))
        }
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

const api = new MainApi()

export default api
