import { withNextRouter } from 'storybook-addon-next-router'
import { muiTheme } from 'storybook-addon-material-ui'
import { addDecorator } from '@storybook/react'
import { theme } from '../shared/CustomTheme'
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

export const decorators = [muiTheme(theme)]

addDecorator(
  withNextRouter({
    path: '/', // defaults to `/`
    asPath: '/', // defaults to `/`
    query: {}, // defaults to `{}`
    push() {}, // defaults to using addon actions integration, can override any method in the router
  })
)
