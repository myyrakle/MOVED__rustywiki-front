import { css } from '@emotion/react';
import {
  Box,
  Button,
  InputBase,
  MenuItem,
  Select,
  useTheme,
} from '@material-ui/core';
import * as React from 'react';
import DefaultLayout from '../components/DefaultLayout';
import NormalPageContainer from '../components/NormalPageContainer';

const SearchPage = (): JSX.Element => {
  const theme = useTheme();
  return (
    <DefaultLayout>
      <NormalPageContainer title="검색">
        <Box display="flex" justifyContent="center">
          <Box
            display="flex"
            maxWidth="500px"
            width="100%"
            css={css`
              > * + * {
                margin-left: 5px;
              }
            `}
            height={40}
          >
            <Select
              autoWidth={false}
              defaultValue="both"
              variant="outlined"
              inputProps={{ style: { height: 40 } }}
            >
              <MenuItem value="both">제목 + 내용</MenuItem>
              <MenuItem value="title">제목</MenuItem>
              <MenuItem value="content">내용</MenuItem>
            </Select>
            <InputBase
              style={{
                height: 40,
                border: `1px solid ${theme.palette.text.secondary}`,
                borderRadius: 5,
                paddingLeft: 10,
              }}
              fullWidth
            />
            <Button variant="contained">검색</Button>
          </Box>
        </Box>
      </NormalPageContainer>
    </DefaultLayout>
  );
};

export default SearchPage;
