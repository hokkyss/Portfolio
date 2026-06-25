import { CaretLeftIcon } from '@phosphor-icons/react';
import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import Separator from '@portfolio/design-system/separator';
import tw from '@portfolio/design-system/tw';
import { tryit } from '@portfolio/utils';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import codeHighlighterCss from 'highlight.js/styles/github-dark.css?url';
import getBlogQuery from '../lib/blogs/queries/get-blog.query';
import renderMarkdownFunction from '../lib/common/functions/render-markdown.function';
import renderMarkdownQuery from '../lib/common/queries/render-markdown.query';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  loader: async ({ context, params }) => {
    const [data] = await tryit(context.queryClient.ensureQueryData(getBlogQuery(params.slug)));

    if (!data) {
      throw notFound();
    }

    // Prefetch the markdown to be rendered on the server
    await context.queryClient.ensureQueryData(renderMarkdownQuery(data.content));
    const renderedMarkdown = await renderMarkdownFunction({
      data: {
        content: data.content,
      },
    });

    return {
      renderedMarkdown,
    };
  },
  head() {
    return {
      links: [
        {
          fetchPriority: 'high',
          href: codeHighlighterCss,
          rel: 'stylesheet',
        },
      ],
    };
  },
});

/**
 *
 */
function BlogPostComponent() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(getBlogQuery(slug));
  const { data: renderedMarkdown } = useSuspenseQuery(renderMarkdownQuery(post.content));

  return (
    <main className={tw`mx-auto max-w-4xl px-6 py-24 w-full`}>
      <div className={tw`mb-8`}>
        <Button
          className={tw`-ml-4 mb-4`}
          nativeButton={false}
          render={(
            <Link to="/blog">
              <CaretLeftIcon className={tw`mr-2`} size={16} />
              Back to blogs
            </Link>
          )}
          variant="ghost"
        />

      </div>

      <header className={tw`mb-12`}>
        <Badge
          className={tw`mb-3 font-mono text-xs uppercase tracking-widest`}
          variant="secondary"
        >
          $ cat
          {' '}
          {slug}
          .md
        </Badge>
        <h1 className={tw`mb-4 text-4xl font-bold tracking-tight md:text-5xl`}>{post.title}</h1>
        <div className={tw`flex flex-wrap items-center gap-4 text-muted-foreground`}>
          <div className={tw`flex flex-wrap gap-2`}>
            {post.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <span>&bull;</span>
          <div>
            Last updated on
            {' '}
            {new Date(post.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </header>

      <Separator className={tw`my-8`} />

      <article className={tw`prose prose-neutral dark:prose-invert max-w-none`}>
        {renderedMarkdown}
      </article>
    </main>
  );
}
