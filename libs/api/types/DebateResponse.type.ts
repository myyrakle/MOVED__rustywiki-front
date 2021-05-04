import type { CursorPagingResultType } from './CursorPagingResult.type';
import { DefaultResponse } from './DefaultResponse.type';

export type DebateType = {
  id: number;
  writer_id: number;
  writer_name: string;
  subject: string;
  content: string;
  reg_utc: number;
};

export type CommentType = {
  id: number;
  writer_id: number;
  writer_name: string;
  content: string;
  reg_utc: number;
};

export type GetDocDebateListResponseType = CursorPagingResultType<DebateType>;
export type GetDocDebateResponseType = {
  debate: DebateType;
  comment_list: CommentType[];
  total_count: number;
  has_next: boolean;
  next_token?: string;
} & DefaultResponse;
