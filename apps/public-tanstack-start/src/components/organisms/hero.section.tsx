import tw from '@portfolio/design-system/tw';
import { GithubLogoIcon, LinkedinLogoIcon } from '@phosphor-icons/react';
import Typewriter from '../atoms/typewriter.atom';

const PHRASES = [
  'a Fullstack Engineer',
  'a Problem Solver',
  'a Node.js Developer',
  'a Pokémon Trainer 🎮',
  'a Lifelong Learner',
];

/**
 * Full-viewport hero section with typewriter headline and social CTAs.
 */
export default function HeroSection() {
  return (
    <section
      className={tw`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20`}
      id="hero"
    >
      {/* Ambient grid background */}
      <div
        aria-hidden="true"
        className={tw`pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,oklch(var(--foreground)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,oklch(var(--foreground)/0.04)_1px,transparent_1px)] [background-size:48px_48px]`}
      />

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className={tw`pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_80%_50%_at_50%_40%,oklch(var(--primary)/0.12),transparent)]`}
      />

      <div className={tw`relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center`}>
        {/* Eyebrow */}
        <span
          className={tw`inline-block rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-mono text-xs tracking-widest text-primary uppercase`}
        >
          i-am.hokkyss.com
        </span>

        {/* Main heading */}
        <h1 className={tw`text-5xl font-bold tracking-tight text-foreground sm:text-7xl`}>
          Hokki Suwanda
        </h1>

        {/* Typewriter subtitle */}
        <p className={tw`text-xl text-muted-foreground sm:text-2xl`}>
          I am{' '}
          <Typewriter
            className={tw`font-semibold text-primary`}
            phrases={PHRASES}
          />
        </p>

        {/* Brief tagline */}
        <p className={tw`max-w-xl text-base text-muted-foreground`}>
          Fullstack Software Engineer from Indonesia — building clean, performant applications
          with a passion for elegant solutions.
        </p>

        {/* CTAs */}
        <div className={tw`flex flex-wrap items-center justify-center gap-3`}>
          <a
            aria-label="View GitHub profile"
            className={tw`inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-medium transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary`}
            href="https://link.hokkyss.com/github"
            id="hero-github-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GithubLogoIcon size={18} />
            GitHub
          </a>
          <a
            aria-label="View LinkedIn profile"
            className={tw`inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/80`}
            href="https://link.hokkyss.com/linkedin"
            id="hero-linkedin-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            <LinkedinLogoIcon size={18} />
            LinkedIn
          </a>
        </div>

        {/* Scroll hint */}
        <div className={tw`mt-4 flex flex-col items-center gap-1 text-xs text-muted-foreground`}>
          <span>Scroll to explore</span>
          <svg
            className={tw`h-4 w-4 animate-bounce`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </section>
  );
}
