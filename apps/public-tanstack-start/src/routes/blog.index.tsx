import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import Card from '@portfolio/design-system/card';
import CardContent from '@portfolio/design-system/card-content';
import CardDescription from '@portfolio/design-system/card-description';
import CardHeader from '@portfolio/design-system/card-header';
import CardTitle from '@portfolio/design-system/card-title';
import tw from '@portfolio/design-system/tw';
import { getReadingTime } from '@portfolio/utils';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import listBlogsQuery from '../lib/blogs/queries/list-blogs.query';

export const Route = createFileRoute('/blog/')({
  component: BlogListingComponent,
  loader: ({ context }) => {
    return {
      promise: context.queryClient.ensureInfiniteQueryData(listBlogsQuery()),
    };
  },
});

/**
 *
 */
function BlogListingComponent() {
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    {
      ...listBlogsQuery(),
      select: (d) => d.pages.flatMap((page) => page.items),
    },
  );

  return (
    <main className={tw`mx-auto max-w-6xl px-6 py-24 w-full`}>
      <Badge
        className={tw`mb-3 font-mono text-xs uppercase tracking-widest`}
        variant="secondary"
      >
        $ ls -la /blogs
      </Badge>
      <h1 className={tw`mb-12 text-4xl font-bold tracking-tight`}>Blog</h1>

      <div className={tw`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`}>
        {posts.map((post) => (
          <Link className={tw`block`} key={post.id} params={{ slug: post.slug }} to="/blog/$slug">
            <Card className={tw`h-full transition-all hover:border-primary/50 hover:bg-primary/5`}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.updatedAt).toLocaleDateString()}
                  {' '}
                  &bull;
                  {' '}
                  {getReadingTime(post.content)}
                  {' '}
                  min read
                </CardDescription>
              </CardHeader>
              {post.categories.length > 0 && (
                <CardContent className={tw`flex flex-wrap gap-2`}>
                  {post.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </CardContent>
              )}
            </Card>
          </Link>
        ))}
      </div>

      {hasNextPage && (
        <div className={tw`mt-8 flex justify-center`}>
          <Button
            disabled={isFetchingNextPage}
            onClick={() => void fetchNextPage()}
            variant="outline"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </main>
  );
}
