import { StylesProvider } from '@material-ui/core/styles'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'
import { css, Global } from '@emotion/react'

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

export type Theme = typeof theme

export default function CustomTheme(props: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <Global
        styles={css`
          a {
            text-decoration: none;
            color: ${theme.palette.text.secondary};
            &:hover {
              text-decoration: underline;
            }
          }
        `}
      />
      <StylesProvider injectFirst>
        <CssBaseline />
        {props.children}
      </StylesProvider>
    </MuiThemeProvider>
  )
}
