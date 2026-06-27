import { queryOptions } from '@tanstack/react-query';
import renderMarkdownFunction from '../functions/render-markdown.function';

/**
 * Query options for fetching rendered markdown from the server.
 * @param content The raw markdown content to render.
 */
export default function renderMarkdownQuery(content: string) {
  return queryOptions({
    queryKey: ['markdown', content],
    queryFn: ({ signal }) => renderMarkdownFunction({ data: { content }, signal }),
  });
}
