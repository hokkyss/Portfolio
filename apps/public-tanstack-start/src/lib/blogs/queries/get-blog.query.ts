import { queryOptions } from '@tanstack/react-query';
import getBlogFunction from '../functions/get-blog.function';

/**
 *
 * @param slug
 */
export default function getBlogQuery(slug: string) {
  return queryOptions({
    queryKey: ['blogs', slug],
    queryFn: ({ signal }) => getBlogFunction({ data: { slug }, signal }),
  });
}
