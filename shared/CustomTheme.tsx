import { StylesProvider } from '@material-ui/core/styles'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { css, Global } from '@emotion/react'
import { useDarkMode } from '../hooks/useDarkMode'
import { SnackbarProvider } from 'notistack'

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6772e5',
    },
    text: {
      secondary: '#0275d8',
    },
  },
})

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: { paper: '#2D333B ', default: '#22272E' },
    primary: {
      main: '#DDD',
    },
    text: {
      primary: '#ADBAC7',
      secondary: '#768390',
    },
  },
})

export type Theme = typeof theme

export default function CustomTheme(props: {
  children: React.ReactNode
}): JSX.Element {
  const { mode } = useDarkMode()
  return (
    <MuiThemeProvider theme={mode === 'dark' ? darkTheme : theme}>
      <Global
        styles={css`
          a {
            text-decoration: none;
            color: ${theme.palette.text.secondary};
            &:hover {
              text-decoration: underline;
            }
          }
          html {
          }
          body {
            visibility: ${mode ? 'visible' : 'hidden'};
          }
        `}
      />
      <StylesProvider injectFirst>
        <CssBaseline />
        <SnackbarProvider maxSnack={3}>{props.children}</SnackbarProvider>
      </StylesProvider>
    </MuiThemeProvider>
  )
}
