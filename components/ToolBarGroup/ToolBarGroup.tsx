import { css } from '@emotion/react';
import { Button, ButtonGroup, useTheme } from '@material-ui/core';
import { StarOutline } from '@material-ui/icons';
import Star from '@material-ui/icons/Star';
import Link from 'next/link';
import * as React from 'react';
import { ROUTES } from '../../libs/const/routes';

export interface IToolbarGroupProps {
  /** 페이지의 제목이자 식별자 */
  pageName: string;

  starCount?: number;
  starClicked?: boolean;
  toggleStar?: () => void | Promise<void>;
  canDelete?: boolean;
}

const routeToHref = (pathname: string, pageName: string) => {
  return {
    pathname,
    query: { pageName },
  };
};

const ToolbarGroup: React.FunctionComponent<IToolbarGroupProps> = ({
  pageName,
  canDelete = false,
  starCount = 0,
  starClicked,
  toggleStar = () => null,
}) => {
  const theme = useTheme();

  return (
    <ButtonGroup
      size="small"
      css={css`
        a {
          display: inline-block;
          width: 100%;
          height: 100%;
          color: ${theme.palette.text.primary};
        }
      `}
    >
      <Button onClick={toggleStar}>
        {starClicked ? (
          <>
            <Star fontSize="small" color={'primary'} />
            {starCount}
          </>
        ) : (
          <>
            <StarOutline fontSize="small" color={'primary'} />
            {starCount}
          </>
        )}
      </Button>
      <Button>
        <Link href={routeToHref(ROUTES.BACK_LINK, pageName)}>
          <a>백링크</a>
        </Link>
      </Button>
      <Button>
        <Link href={routeToHref(ROUTES.DISCUSS, pageName)}>
          <a>토론</a>
        </Link>
      </Button>
      <Button>
        <Link href={routeToHref(ROUTES.EDIT, pageName)}>
          <a>편집</a>
        </Link>
      </Button>
      {canDelete && <Button color="primary">삭제</Button>}
      <Button>
        <Link href={routeToHref(ROUTES.HISTORIES, pageName)}>
          <a>역사</a>
        </Link>
      </Button>
      <Button>
        <Link href={routeToHref(ROUTES.ACL, pageName)}>
          <a>ACL</a>
        </Link>
      </Button>
    </ButtonGroup>
  );
};

export default ToolbarGroup;
