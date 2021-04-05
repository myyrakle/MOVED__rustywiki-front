import { css } from '@emotion/react'
import {
  IconButton,
  InputBase,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import * as React from 'react'
import ShuffleIcon from '@material-ui/icons/Shuffle'
import SearchIcon from '@material-ui/icons/SearchOutlined'

//TODO: Search기능 연동 및 Enter, 키다운 입력시 처리 필요
export interface ISearchBarProps {
  /**
   * enter 클릭시 존재하면 페이지 바로가기 없으면 검색
   */
  onGoToDirect?: (val: string) => void

  /**
   * random버튼 클릭시에 바로 랜덤위키페이지로 이동
   */
  onGoToRandom?: () => void

  /**
   * 검색어 존재하에 tab키 입력시, 바로 검색페이지로 이동
   */
  onGoToSearch?: (val: string) => void
}

const SearchBar: React.FunctionComponent<ISearchBarProps> = () => {
  const theme = useTheme()
  const mq = useMediaQuery(theme.breakpoints.up('sm'))
  return (
    <div
      css={css`
        border-radius: 0;
      `}
    >
      <div
        css={css`
          display: flex;
          background-color: ${theme.palette.type === 'dark'
            ? 'transparent'
            : 'white'};
          border: 1px solid ${theme.palette.type === 'dark' ? '#444' : '#ccc'};
          box-sizing: border-box;
          height: 42px;
          width: auto;
          justify-content: flex-end;
          align-items: center;
          transition: all 0.2s;
          ${mq
            ? `width: 24ch;
              &:focus-within {
                width: 32ch;
              }`
            : `width: 100%`}
        `}
      >
        <IconButton
          css={css`
            height: 42px;
            width: 28px;
          `}
          tabIndex={-1}
        >
          <ShuffleIcon fontSize="small" />
        </IconButton>
        <InputBase
          css={css`
            min-width: unset;
            height: 42px;
            border-right: 1px solid
              ${theme.palette.type === 'dark' ? '#444' : '#ccc'};
            border-left: 1px solid
              ${theme.palette.type === 'dark' ? '#444' : '#ccc'};
            padding-left: 10px;
            font-size: 14px;

            width: 100%;
          `}
          placeholder="검색"
        />
        <IconButton
          css={css`
            height: 42px;
            width: 28px;
          `}
          tabIndex={-1}
        >
          <SearchIcon fontSize="small" />
        </IconButton>
      </div>
    </div>
  )
}

export default SearchBar
