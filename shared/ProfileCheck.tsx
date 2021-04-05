import * as React from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../hooks/useAccess'
import api from '../libs/api'

const ProfileCheck: React.FunctionComponent<any> = (props) => {
  const [, setUser] = useRecoilState(userState)
  React.useEffect(() => {
    api.user.getMyInfo().then((data) => {
      setUser({
        auth: !!data,
        email: data?.email,
        nickname: data?.nickname,
      })
    })
  }, [])
  return props.children
}

export default ProfileCheck
