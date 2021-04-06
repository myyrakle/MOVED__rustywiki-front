import * as React from 'react'
import { AuthApi } from '../libs/api/AuthApi'
import { MainApi } from '../libs/api/MainApiClient'
import { UserApi } from '../libs/api/UserApi'

interface IApiProviderProps {
  mainApi?: MainApi
  user?: UserApi
  auth?: AuthApi
}

const context = React.createContext<MainApi>({} as MainApi)

export const ApiProvider: React.FunctionComponent<IApiProviderProps> = ({
  mainApi = {} as MainApi,
  user,
  auth,
  children,
}) => {
  if (user) {
    mainApi.user = user
  }
  if (auth) {
    mainApi.auth = auth
  }

  return <context.Provider value={mainApi}>{children}</context.Provider>
}

export default function useApi(): MainApi {
  const api = React.useContext(context)

  return api
}
