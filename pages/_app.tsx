import React from 'react'
import { AppProps } from 'next/app'
import CustomTheme from '../shared/CustomTheme'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  const queryClientRef = React.useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    jssStyles?.parentElement?.removeChild(jssStyles)
  }, [])

  return (
    <>
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <CustomTheme>
            <Component {...pageProps} />
          </CustomTheme>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}
