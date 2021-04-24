import type { DefaultResponse } from './DefaultResponse.type';
import type { PagingResultType } from './PagingResult.type';

export type DebateType = {
  id: number;
  writer_id: number;
  writer_name: string;
  subject: string;
  content: string;
  reg_utc: number;
};

export type GetDocDebateListResponseType = DefaultResponse &
  PagingResultType<DebateType>;
