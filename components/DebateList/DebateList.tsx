import Link from 'next/link';
import * as React from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import { ROUTES } from '../../libs/const/routes';

export interface IDebateListProps {
  pageName: string;
  list?: any[];
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  onFetchNext: () => Promise<any>;
}

const DebateList: React.FunctionComponent<IDebateListProps> = ({
  list,
  isFetchingNextPage,
  onFetchNext,
  pageName,
  hasNextPage,
}) => {
  return (
    <InfiniteScroller
      hasMore={hasNextPage}
      loadMore={async () => {
        if (!isFetchingNextPage) {
          return onFetchNext();
        }
      }}
    >
      <ul>
        {list?.map((v) => (
          <li key={v?.id}>
            <Link
              href={{
                pathname: ROUTES.THREAD,
                query: { pageName, debate_id: v?.id },
              }}
            >
              {v?.subject}
            </Link>
          </li>
        ))}
      </ul>
    </InfiniteScroller>
  );
};

export default DebateList;
