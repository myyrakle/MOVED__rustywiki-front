import { css } from '@emotion/react'
import * as React from 'react'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ISideContentProps {}

const SideContent: React.FunctionComponent<ISideContentProps> = () => {
  return <aside css={css``}>SideContent</aside>
}

export default SideContent
