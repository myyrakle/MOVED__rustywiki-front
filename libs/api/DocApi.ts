import { AxiosInstance } from 'axios';
import type { DefaultResponse } from './DefaultResponse.type';
import type { PagingResultType } from './PagingResult.type';

type RegisterDocumentResponse = DefaultResponse & {
  is_new_doc: boolean;
};

export type GetDocumentResponse = DefaultResponse & {
  not_exists: boolean;
  title: string;
  content: string;
  last_update_utc: number;
};

export type DocHistoryType = {
  id: number;
  content: string;
  char_count: number;
  increase: number;
  reg_utc: number; //timestamp
  writer_id: number;
  writer_name: string;
};

export type GetDocHistoriesResponseType = DefaultResponse &
  PagingResultType<DocHistoryType>;

export class DocApi {
  constructor(private axios: AxiosInstance) {}

  async getDocument(title: string): Promise<GetDocumentResponse> {
    const result = await this.axios.get<GetDocumentResponse>('/doc/document', {
      params: { title },
    });

    return result?.data;
  }

  async registerDocument(
    title: string,
    content: string
  ): Promise<RegisterDocumentResponse> {
    const result = await this.axios.post<RegisterDocumentResponse>(
      '/doc/document',
      {
        title,
        content,
      }
    );
    return result?.data;
  }

  async getDocumentHistory(
    title: string,
    page: number
  ): Promise<GetDocHistoriesResponseType> {
    const result = await this.axios.get<GetDocHistoriesResponseType>(
      '/doc/history',
      {
        params: {
          title,
          page,
        },
      }
    );
    return result?.data;
  }
}
