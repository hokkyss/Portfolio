import { createFileRoute } from '@tanstack/react-router';
import tw from '@portfolio/design-system/tw';
import { NotePencilIcon } from '@phosphor-icons/react';

export const Route = createFileRoute('/blog')({
  component: RouteComponent,
});

/**
 * Blog coming soon placeholder page.
 */
function RouteComponent() {
  return (
    <main
      className={tw`flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center`}
      id="blog-page"
    >
      {/* Icon */}
      <div
        className={tw`flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card text-primary`}
      >
        <NotePencilIcon size={40} weight="duotone" />
      </div>

      {/* Label */}
      <span
        className={tw`inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-xs tracking-widest text-primary uppercase`}
      >
        Coming Soon
      </span>

      <h1 className={tw`text-5xl font-bold tracking-tight`}>Blog</h1>

      <p className={tw`max-w-md text-muted-foreground`}>
        I'm working on it. In the meantime, connect with me on LinkedIn or GitHub to stay
        updated on what I'm building.
      </p>

      {/* Links */}
      <div className={tw`flex gap-4`}>
        <a
          className={tw`rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary`}
          href="https://link.hokkyss.com/github"
          id="blog-github-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>
        <a
          className={tw`rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80`}
          href="https://link.hokkyss.com/linkedin"
          id="blog-linkedin-link"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
      </div>
    </main>
  );
}
