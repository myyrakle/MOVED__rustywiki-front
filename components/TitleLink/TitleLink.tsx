import { css } from '@emotion/react';
import { useTheme } from '@material-ui/core';
import Link from 'next/link';
import * as React from 'react';
import { ROUTES } from '../../libs/const/routes';

interface ITitleLinkProps {
  pageName: string;
}

const TitleLink: React.FunctionComponent<ITitleLinkProps> = ({ pageName }) => {
  const theme = useTheme();
  return (
    <Link href={{ pathname: ROUTES.WIKI, query: { pageName } }}>
      <a
        css={css`
          color: ${theme.palette.text.primary};
          cursor: pointer;
          width: 100%;
        `}
      >
        {pageName}
      </a>
    </Link>
  );
};

export default TitleLink;
