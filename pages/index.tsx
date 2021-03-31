import * as React from 'react'
import DefaultLayout from '../components/DefaultLayout'
import PageContainer from '../components/PageContainer'

const MainPage = (): JSX.Element => {
  return (
    <DefaultLayout>
      <PageContainer title="Title">children</PageContainer>
    </DefaultLayout>
  )
}

export default MainPage
