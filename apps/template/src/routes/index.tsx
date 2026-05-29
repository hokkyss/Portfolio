import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
  shouldReload: false,
  headers() {
    return {
      'Netlify-CDN-Cache-Control': 'public, maxage=604800, s-maxage=604800, stale-while-revalidate',
      'Netlify-Vary': 'cookie=th',
    };
  },
});

/**
 *
 */
function RouteComponent() {
  return (
    <div>Index</div>
  );
}
