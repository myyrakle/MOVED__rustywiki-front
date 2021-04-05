import { css } from '@emotion/react'
import { useMediaQuery, useTheme } from '@material-ui/core'
import * as React from 'react'
import Header from '../Header'
import SideContent from '../SideContent/SideContent'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IDefaultLayoutProps {}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = ({
  children,
}) => {
  const theme = useTheme()
  const mq = useMediaQuery(theme.breakpoints.up('md'))
  const mobile = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <div>
      <Header />
      <main>
        <div
          css={css`
            max-width: 1300px;
            display: ${mq ? 'flex' : 'block'};
            margin: auto;
            margin-top: ${mobile ? 0 : '10px'};
          `}
        >
          <article
            css={css`
              width: 100%;
            `}
          >
            {children}
          </article>
          <div
            css={css`
              min-width: ${mq ? '270px' : '100%'};
              flex-basis: 270;
              margin: 15px;
            `}
          >
            <SideContent />
          </div>
        </div>
      </main>
    </div>
  )
}

export default DefaultLayout
