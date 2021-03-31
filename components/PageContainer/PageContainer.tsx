import { css } from '@emotion/react'
import {
  Button,
  ButtonGroup,
  Grid,
  Paper,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Link from 'next/link'
import * as React from 'react'
import StarOutline from '@material-ui/icons/StarOutline'
import Star from '@material-ui/icons/Star'
import dayjs from 'dayjs'

export interface IPageContainerProps {
  title?: string
  updatedAt?: Date
}

const ToolBarGroup = () => (
  <ButtonGroup size="small">
    <Button>
      <Star fontSize="small" color={'primary'} />1
      <StarOutline fontSize="small" color={'primary'} />1
    </Button>
    <Button>역링크</Button>
    <Button>토론</Button>
    <Button>편집</Button>
    <Button>역사</Button>
    <Button>ACL</Button>
  </ButtonGroup>
)

const PageContainer: React.FunctionComponent<IPageContainerProps> = ({
  children,
  title = '',
  updatedAt = new Date(),
}) => {
  const theme = useTheme()
  const mq = useMediaQuery(theme.breakpoints.down('xs'))
  return (
    <Paper
      css={css`
        padding: ${mq ? '24px' : '11.2px'};
        position: relative;
      `}
    >
      <h1
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Link href="/">
          <a
            css={css`
              color: ${theme.palette.text.primary};
              cursor: pointer;
            `}
          >
            {title}
          </a>
        </Link>

        <Grid
          container
          justify="flex-end"
          css={css`
            flex-shrink: 1;
            ${mq
              ? `position: absolute;
            top: 0;
            left: 0;`
              : ''}
          `}
        >
          <ToolBarGroup />
        </Grid>
      </h1>
      <p
        css={css`
          font-size: 12px;
          /* display: flex;
          justify-content: flex-end;
          */
          letter-spacing: -0.1px;
          text-align: right;
        `}
      >
        최근 수정 시각:
        <time
          css={css`
            margin-left: 5px;
          `}
        >
          {dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
        </time>
      </p>
      <div
        css={css`
          border-radius: 3px;
          border: 1px solid #ccc;
          display: flex;
          > * {
            margin: 0;
          }
          padding: 2px 2px 2px 4px;
          align-items: center;
          height: 29px;
        `}
      >
        <h2
          css={css`
            font-size: 12px;
            line-height: 1;
          `}
        >
          분류:
        </h2>
        <ul
          css={css`
            display: flex;
            list-style: none;
            padding: 0;
            margin-left: 5px;
            font-size: 13px;
            line-height: 1;
            li {
              /* padding-right: 3px; */
              position: relative;
            }
            li + li {
              &::before {
                /* position: absolute; */
                height: 5px;
                margin: 0 5px;
                content: '|';
              }
            }
          `}
        >
          <li>
            <Link href="1">1</Link>
          </li>
          <li>
            <Link href="2">2</Link>
          </li>
        </ul>
      </div>
      {children}
    </Paper>
  )
}

export default PageContainer
