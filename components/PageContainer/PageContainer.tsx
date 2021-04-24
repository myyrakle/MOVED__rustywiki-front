import { css } from '@emotion/react';
import { Grid, Paper, useMediaQuery, useTheme } from '@material-ui/core';
import * as React from 'react';
import dayjs from 'dayjs';
import ToolBarGroup from '../ToolBarGroup';
import TitleLink from '../TitleLink/TitleLink';

export interface IPageContainerProps {
  title?: string;
  updatedAt?: Date;
}

const PageContainer: React.FunctionComponent<IPageContainerProps> = ({
  children,
  title = '',
  updatedAt,
}) => {
  const theme = useTheme();
  const mq = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <Paper
      css={css`
        padding: ${mq ? '11.2px' : '24px'};
        position: relative;
      `}
    >
      <h1
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <TitleLink pageName={title} />
        <Grid
          container
          justify="flex-end"
          css={css`
            ${mq
              ? `
              position: absolute;
              top: 0;
              left: 0;
              margin-top: -1px;
            `
              : ''}
          `}
        >
          <ToolBarGroup pageName={title} />
        </Grid>
      </h1>
      <p
        css={css`
          font-size: 12px;
          letter-spacing: -0.1px;
          text-align: right;
        `}
      >
        {updatedAt && (
          <>
            최근 수정 시각:
            <time
              css={css`
                margin-left: 5px;
              `}
            >
              {dayjs(updatedAt).format('YYYY-MM-DD HH:mm:ss')}
            </time>
          </>
        )}
      </p>

      {children}
    </Paper>
  );
};

export default PageContainer;
