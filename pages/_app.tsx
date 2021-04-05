import React, { useEffect } from 'react'
import { AppProps } from 'next/app'
import CustomTheme from '../shared/CustomTheme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { RecoilRoot } from 'recoil'
import ProfileCheck from '../shared/ProfileCheck'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const queryClientRef = React.useRef<QueryClient>()

  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <RecoilRoot>
        <QueryClientProvider client={queryClientRef.current}>
          <Hydrate state={pageProps.dehydratedState}>
            <CustomTheme>
              <ProfileCheck>
                <Component {...pageProps} />
              </ProfileCheck>
            </CustomTheme>
          </Hydrate>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  )
}
