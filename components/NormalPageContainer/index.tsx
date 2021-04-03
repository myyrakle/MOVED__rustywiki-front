import { css } from '@emotion/react'
import { Paper } from '@material-ui/core'
import * as React from 'react'

interface INormalPageContainerProps {
  title?: React.ReactNode
}

const NormalPageContainer: React.FunctionComponent<INormalPageContainerProps> = ({
  title,
  children,
}) => {
  return (
    <Paper
      css={css`
        padding: 20px;
        min-height: 100vh;
      `}
    >
      <h1
        css={css`
          margin-bottom: 32px;
        `}
      >
        {title}
      </h1>
      {children}
    </Paper>
  )
}

export default NormalPageContainer
