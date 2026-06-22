import 'highlight.js/styles/github-dark.css';
import { CaretLeftIcon } from '@phosphor-icons/react';
import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import Separator from '@portfolio/design-system/separator';
import tw from '@portfolio/design-system/tw';
import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import getBlogQuery from '../lib/blogs/queries/get-blog.query';

export const Route = createFileRoute('/blog/$slug')({
  component: BlogPostComponent,
  loader: async ({ context, params }) => {
    const data = await context.queryClient.ensureQueryData(getBlogQuery(params.slug));

    if (!data) {
      throw notFound();
    }
  },
});

/**
 *
 */
function BlogPostComponent() {
  const { slug } = Route.useParams();
  const { data: post } = useSuspenseQuery(getBlogQuery(slug));

  if (!post) {
    return null;
  }

  return (
    <main className={tw`container mx-auto max-w-3xl px-6 py-12`}>
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

      <header className={tw`mb-8`}>
        <div className={tw`mb-4 flex flex-wrap gap-2`}>
          {post.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
            </Badge>
          ))}
        </div>
        <h1 className={tw`mb-4 text-4xl font-bold tracking-tight md:text-5xl`}>{post.title}</h1>
        <div className={tw`text-muted-foreground`}>
          Last updated on
          {' '}
          {new Date(post.updatedAt).toLocaleDateString()}
        </div>
      </header>

      <Separator className={tw`my-8`} />

      <article className={tw`prose prose-neutral dark:prose-invert max-w-none`}>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]} remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </article>
    </main>
  );
}
