import { AppProps } from 'next/app'
import CustomTheme from '../shared/CustomTheme'

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <CustomTheme>
        <Component {...pageProps} />
      </CustomTheme>
    </>
  )
}
