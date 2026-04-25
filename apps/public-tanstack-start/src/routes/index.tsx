import { useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import getExperiencesQuery from '../lib/experiences/queries/get-experiences.query';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  loader: async (ctx) => {
    await ctx.context.queryClient.prefetchQuery(getExperiencesQuery({}));
  },
});

/**
 *
 */
function RouteComponent() {
  const { data } = useSuspenseQuery(getExperiencesQuery({}));
  return <div>{JSON.stringify(data, undefined, 2)}</div>;
}
