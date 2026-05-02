import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

interface ScreenshotFrameProps {
  className?: string;
  title: string;
  url?: string;
}

/**
 * A browser-chrome–style wrapper that displays a live screenshot of the given URL
 * by calling the /api/screenshot server route.
 * @param root0
 * @param root0.url
 * @param root0.title
 * @param root0.className
 */
export default function ScreenshotFrame({ className, title, url }: ScreenshotFrameProps) {
  const screenshotSrc = url ? `/api/screenshot?url=${encodeURIComponent(url)}` : null;

  return (
    <div className={cn(tw`overflow-hidden rounded-lg border border-border bg-card`, className)}>
      {/* Browser chrome bar */}
      <div className={tw`flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2`}>
        <div className={tw`h-2.5 w-2.5 rounded-full bg-destructive/50`} />
        <div className={tw`h-2.5 w-2.5 rounded-full bg-primary/50`} />
        <div className={tw`h-2.5 w-2.5 rounded-full bg-accent/60`} />
        <div
          className={tw`ml-2 flex-1 truncate rounded bg-background px-2 py-0.5 font-mono text-xs text-muted-foreground`}
        >
          {url ?? 'No URL'}
        </div>
      </div>

      {/* Screenshot or placeholder */}
      {screenshotSrc
        ? (
          <img
            alt={`${title} website preview`}
            className={tw`aspect-video w-full object-cover object-top`}
            loading="lazy"
            src={screenshotSrc}
          />
        )
        : (
          <div
            className={tw`flex aspect-video w-full items-center justify-center bg-muted text-sm text-muted-foreground`}
          >
            No preview available
          </div>
        )}
    </div>
  );
}
