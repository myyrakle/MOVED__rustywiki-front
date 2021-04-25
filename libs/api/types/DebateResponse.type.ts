import type { CursorPagingResultType } from './CursorPagingResult.type';

export type DebateType = {
  id: number;
  writer_id: number;
  writer_name: string;
  subject: string;
  content: string;
  reg_utc: number;
};

export type GetDocDebateListResponseType = CursorPagingResultType<DebateType>;
