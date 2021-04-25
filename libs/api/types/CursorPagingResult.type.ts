import { DefaultResponse } from './DefaultResponse.type';

export type CursorPagingResultType<T> = {
  list: T[];
  total_count: number;
  has_next: boolean;
  next_token: string;
} & DefaultResponse;
