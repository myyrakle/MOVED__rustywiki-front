import * as React from 'react'
import useAccess from '../../hooks/useAccess'
import Header from './Header'

const HeaderWrapper: React.FunctionComponent<any> = () => {
  const { user } = useAccess()
  return <Header user={user} />
}

export default HeaderWrapper
