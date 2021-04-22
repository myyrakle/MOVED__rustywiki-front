import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import * as React from 'react';
import type {
  DocHistoryType,
  GetDocHistoriesResponseType,
} from '../../libs/api/DocApi';

export interface IRevisionTableProps {
  response?: GetDocHistoriesResponseType;
  onChangePage: (page: number) => void;
}

const RowItem = ({
  row,
  previous,
  next,
  handlePrevious = () => null,
  handleNext = () => null,
}: {
  row?: DocHistoryType;
  previous?: DocHistoryType;
  next?: DocHistoryType;
  handlePrevious?: (row?: DocHistoryType) => void;
  handleNext?: (row?: DocHistoryType) => void;
}) => {
  return (
    <TableRow key={row?.id}>
      <TableCell component="th" scope="row">
        {row?.id}
      </TableCell>
      <TableCell align="right">{row?.reg_utc}</TableCell>
      <TableCell align="right">{row?.writer_name}</TableCell>
      <TableCell align="right">
        {(next?.id === undefined || (row && next.id > row.id)) && (
          <input
            type="radio"
            name="previous"
            value={row?.id}
            defaultChecked={row?.id === previous?.id}
            onClick={() => {
              handlePrevious?.(row);
            }}
          />
        )}
      </TableCell>
      <TableCell align="right">
        {(previous?.id === undefined || (row && previous.id < row.id)) && (
          <input
            type="radio"
            name="next"
            value={row?.id}
            defaultChecked={row?.id === next?.id}
            onClick={() => {
              handleNext?.(row);
            }}
          />
        )}
      </TableCell>
    </TableRow>
  );
};

const RevisionTable: React.FunctionComponent<IRevisionTableProps> = ({
  response,
  onChangePage,
}) => {
  const [previous, setPrevious] = React.useState<DocHistoryType | undefined>(
    undefined
  );
  const [next, setNext] = React.useState<DocHistoryType | undefined>(undefined);

  const lastEl = response?.list?.[response?.list?.length - 1];
  const firstEl = response?.list?.[0];

  const nextState = React.useMemo(() => {
    if (!next) {
      return undefined;
    }
    if (lastEl && lastEl.id > next.id) {
      return 'small';
    }
    if (firstEl && firstEl.id < next.id) {
      return 'big';
    }
    if (lastEl && lastEl.id <= next.id && firstEl && firstEl.id >= next.id) {
      return 'between';
    }
    return undefined;
  }, [next, firstEl, lastEl]);

  const previousState = React.useMemo(() => {
    if (!previous) {
      return undefined;
    }
    if (lastEl && lastEl.id > previous.id) {
      return 'small';
    }
    if (firstEl && firstEl.id < previous.id) {
      return 'big';
    }
    if (
      lastEl &&
      lastEl.id <= previous.id &&
      firstEl &&
      firstEl.id >= previous.id
    ) {
      return 'between';
    }
    return undefined;
  }, [previous, firstEl, lastEl]);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>리비전</TableCell>
              <TableCell align="right">시간</TableCell>
              <TableCell align="right">편집자</TableCell>
              <TableCell width="40px" align="right"></TableCell>
              <TableCell width="40px" align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {nextState === 'big' && (
              <RowItem
                row={next}
                next={next}
                previous={previous}
                handleNext={() => setNext(next)}
                handlePrevious={() => setPrevious(next)}
              />
            )}
            {previousState === 'big' && (
              <RowItem
                row={previous}
                next={next}
                previous={previous}
                handleNext={() => setNext(previous)}
                handlePrevious={() => setPrevious(previous)}
              />
            )}
            {response?.list?.map((row) => (
              <RowItem
                key={row.id}
                row={row}
                previous={previous}
                next={next}
                handleNext={(item) => setNext(item)}
                handlePrevious={(item) => setPrevious(item)}
              />
            ))}
            {nextState === 'small' && (
              <RowItem
                row={next}
                next={next}
                previous={previous}
                handleNext={() => setNext(next)}
                handlePrevious={() => setPrevious(next)}
              />
            )}
            {previousState === 'small' && (
              <RowItem
                row={previous}
                next={next}
                previous={previous}
                handleNext={() => setNext(previous)}
                handlePrevious={() => setPrevious(previous)}
              />
            )}
          </TableBody>
        </Table>
        <Box display="flex" justifyContent="center">
          <Pagination
            count={Math.floor((response?.total_count ?? 0 / 10) + 1) ?? 1}
            onChange={(e, page) => {
              onChangePage(page);
            }}
          />
        </Box>
      </TableContainer>
    </div>
  );
};

export default RevisionTable;
