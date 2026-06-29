import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import Card from '@portfolio/design-system/card';
import CardContent from '@portfolio/design-system/card-content';
import CardDescription from '@portfolio/design-system/card-description';
import CardHeader from '@portfolio/design-system/card-header';
import CardTitle from '@portfolio/design-system/card-title';
import Skeleton from '@portfolio/design-system/skeleton';
import tw from '@portfolio/design-system/tw';
import { getReadingTime } from '@portfolio/utils';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { Await, createFileRoute, Link, useLoaderData } from '@tanstack/react-router';
import { Suspense } from 'react';
import listBlogsQuery from '../lib/blogs/queries/list-blogs.query';

export const Route = createFileRoute('/blog/')({
  component: BlogListPage,
  loader: ({ context }) => {
    return {
      promise: context.queryClient.ensureInfiniteQueryData(listBlogsQuery()),
    };
  },
});

/**
 * Renders the blog listing component.
 * @returns Blog cards
 */
function BlogListingComponent() {
  const { data: posts, fetchNextPage, hasNextPage, isFetchingNextPage } = useSuspenseInfiniteQuery(
    {
      ...listBlogsQuery(),
      select: (d) => d.pages.flatMap((page) => page.items),
    },
  );

  return (
    <>
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
    </>
  );
}

/**
 * Static component for blog listing
 * @returns The Header and the blog listing component
 */
function BlogListPage() {
  const promise = useLoaderData({
    from: '/blog/',
    select: (l) => l.promise,
  });

  return (
    <main className={tw`mx-auto max-w-6xl px-6 py-24 w-full`}>
      <Badge
        className={tw`mb-3 font-mono text-xs uppercase tracking-widest`}
        variant="secondary"
      >
        $ ls -la /blogs
      </Badge>
      <h1 className={tw`mb-12 text-4xl font-bold tracking-tight`}>Blog</h1>
      <Suspense fallback={<BlogListSkeleton />}>
        <Await promise={promise}>
          {() => <BlogListingComponent />}
        </Await>
      </Suspense>
    </main>
  );
}

/**
 *
 */
function BlogListSkeleton() {
  return (
    <div className={tw`grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3`}>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card className={tw`h-full transition-all`} key={i}>
          <CardHeader>
            <Skeleton className={tw`h-6 w-3/4 mb-2`} />
            <Skeleton className={tw`h-4 w-1/2`} />
          </CardHeader>
          <CardContent className={tw`flex flex-wrap gap-2`}>
            <Skeleton className={tw`h-5 w-16`} />
            <Skeleton className={tw`h-5 w-24`} />
            <Skeleton className={tw`h-5 w-24`} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
