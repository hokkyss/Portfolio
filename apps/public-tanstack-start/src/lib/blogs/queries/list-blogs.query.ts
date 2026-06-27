import { infiniteQueryOptions } from '@tanstack/react-query';
import listBlogsFunction from '../functions/list-blogs.function';

/**
 *
 */
export default function listBlogsQuery() {
  return infiniteQueryOptions({
    queryKey: ['blogs'],
    queryFn: ({ pageParam, signal }) => listBlogsFunction({ data: {
      cursor: pageParam?.cursor,
    }, signal }),
    initialPageParam: null as { cursor: string } | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
