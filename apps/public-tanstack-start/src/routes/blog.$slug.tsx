import { CaretLeftIcon } from '@phosphor-icons/react';
import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import Separator from '@portfolio/design-system/separator';
import tw from '@portfolio/design-system/tw';
import { tryit } from '@portfolio/utils';
import { QueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query';
import { Await, createFileRoute, Link, notFound, useLoaderData, useParams } from '@tanstack/react-router';
import codeHighlighterCss from 'highlight.js/styles/github-dark.css?url';
import katexCss from 'katex/dist/katex.min.css?url';
import { Suspense } from 'react';
import { GetBlogResponseDto } from '../lib/blogs/dto/get-blog.dto';
import getBlogQuery from '../lib/blogs/queries/get-blog.query';
import renderMarkdownQuery from '../lib/common/queries/render-markdown.query';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  loader: async ({ context, params }) => {
    const [data] = await tryit(context.queryClient.ensureQueryData(getBlogQuery(params.slug)));

    if (!data) {
      throw notFound();
    }

    // Prefetch the markdown to be rendered on the server
    return {
      renderedMarkdown: context.queryClient.ensureQueryData(renderMarkdownQuery(data.content)),
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
        {
          fetchPriority: 'high',
          href: katexCss,
          rel: 'stylesheet',
        },
      ],
    };
  },
  shouldReload: false,
});

/**
 *
 */
function BlogPostComponent() {
  const slug = useParams({
    from: '/blog/$slug',
    select: (d) => d.slug,
  });
  const { data: post } = useSuspenseQuery({
    ...getBlogQuery(slug),
  });
  const renderMarkdownPromise = useLoaderData({
    from: '/blog/$slug',
    select: (d) => d.renderedMarkdown,
  });

  return (
    <main className={tw`mx-auto max-w-4xl px-6 py-24 w-full`}>
      <div className={tw`mb-8`}>
        <Button
          className={tw`-ml-4 mb-4`}
          nativeButton={false}
          render={(
            <Link to="/blog">
              <CaretLeftIcon className={tw`mr-2`} size={16} />
              Back
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

      <QueryErrorResetBoundary>
        <Suspense>
          <Await promise={renderMarkdownPromise}>
            {() => <Wrapped post={post} />}
          </Await>
        </Suspense>
      </QueryErrorResetBoundary>
    </main>
  );
}

/**
 *
 * @param root0
 * @param root0.post
 */
function Wrapped({ post }: { post: GetBlogResponseDto }) {
  const { data: renderedMarkdown } = useSuspenseQuery(renderMarkdownQuery(post.content));

  return renderedMarkdown;
}
