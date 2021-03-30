import * as React from 'react'
import Header from '../components/Header'
// import { QueryClient } from 'react-query'
// import { dehydrate } from 'react-query/hydration'

// export async function getStaticProps() {
//   const queryClient = new QueryClient()

//   await queryClient.prefetchQuery('posts', () => [])

//   return {
//     props: {
//       dehydratedState: dehydrate(queryClient),
//     },
//   }
// }

const MainPage = (): JSX.Element => {
  return (
    <div>
      <Header />
    </div>
  )
}

export default MainPage
