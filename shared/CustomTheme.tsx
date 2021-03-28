import { StylesProvider } from '@material-ui/core/styles'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'
import { CssBaseline } from '@material-ui/core'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6772e5',
    },
  },
})

export type Theme = typeof theme

export default function CustomTheme(props: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        {props.children}
      </StylesProvider>
    </MuiThemeProvider>
  )
}
