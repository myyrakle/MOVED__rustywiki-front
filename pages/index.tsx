import { css } from '@emotion/react'
import Button from '@material-ui/core/Button'
import * as React from 'react'

const MainPage = (): JSX.Element => {
  //   const theme = useTheme()
  return (
    <div
      css={css`
        font-weight: bold;
        font-size: 2em;
      `}
    >
      <Button>Default</Button>
      <Button
        css={css`
          background-color: #6772e5;
          color: #fff;
          box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11),
            0 1px 3px rgba(0, 0, 0, 0.08);
          padding: 7px 14px;

          &:hover {
            background-color: #5469d4;
          }
        `}
      >
        Customized
      </Button>
    </div>
  )
}

export default MainPage
