import { css } from '@emotion/react';
import { Paper, useTheme } from '@material-ui/core';
import dayjs from 'dayjs';
import * as React from 'react';
import { useDarkMode } from '../../hooks/useDarkMode';

interface IDebateCardProps {
  id: number;
  writerName: string;
  registerDate: Date;
  content: string;
}

const DebateCard: React.FunctionComponent<IDebateCardProps> = ({
  id,
  writerName,
  registerDate,
  content,
}) => {
  const theme = useTheme();
  const { mode } = useDarkMode();
  return (
    <Paper title="test">
      <div
        css={css`
          padding: 7px 7px 7px 10px;
          justify-content: space-between;
          display: flex;
          background-color: ${(theme.palette.info as any)?.[mode ?? 'light']};
        `}
      >
        <div>
          <span>#{id}</span>
          <span>{writerName}</span>
        </div>
        <div>{dayjs(registerDate).format('YYYY-MM-DD HH:mm:ss')}</div>
      </div>
      <div
        css={css`
          padding: 13px;
          background-color: ${theme.palette.background.default};
        `}
      >
        {content}
      </div>
    </Paper>
  );
};

export default DebateCard;
