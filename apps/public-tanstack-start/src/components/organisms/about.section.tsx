import tw from '@portfolio/design-system/tw';
import { ArrowSquareOutIcon, CertificateIcon } from '@phosphor-icons/react';

/**
 * About Me section with improved bio and Node.js certification badge.
 */
export default function AboutSection() {
  return (
    <section
      className={tw`mx-auto max-w-6xl px-6 py-24`}
      id="about"
    >
      {/* Section label */}
      <p
        className={tw`mb-3 font-mono text-xs tracking-widest text-primary uppercase`}
      >
        $ whoami
      </p>

      <h2 className={tw`mb-12 text-4xl font-bold tracking-tight`}>About Me</h2>

      <div className={tw`grid gap-12 md:grid-cols-[1fr_auto]`}>
        {/* Bio */}
        <div className={tw`flex flex-col gap-5 text-base leading-relaxed text-muted-foreground`}>
          <p>
            Hey, I'm <span className={tw`font-semibold text-foreground`}>Hokki</span> — a Fullstack
            Software Engineer from Indonesia with a passion for crafting clean, performant
            applications and a love for elegant solutions to complex problems.
          </p>
          <p>
            My story starts with a single Pascal lesson in high school — one program was all it
            took. Competitive programming sharpened my thinking, and I never stopped building. I'm
            a Computer Science graduate from the{' '}
            <span className={tw`font-medium text-foreground`}>
              Bandung Institute of Technology
            </span>
            , and I've been obsessed with software ever since.
          </p>
          <p>
            I work across the full stack with a wide range of technologies, and I genuinely get
            excited picking up something new. I take every responsibility seriously — and I bring
            the same energy to a 2 AM debugging session as I do to greenfielding something from
            scratch.
          </p>
          <p>
            Oh — and if you haven't noticed, this site's design is a love letter to two games that
            mean a lot to me:{' '}
            <a
              className={tw`font-medium text-primary hover:underline`}
              href="https://www.nintendo.com/us/store/products/fire-emblem-three-houses-switch/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Fire Emblem: Three Houses
            </a>{' '}
            and{' '}
            <a
              className={tw`font-medium text-primary hover:underline`}
              href="https://www.pokemon.com/us/pokemon-video-games/pokemon-black-version-and-pokemon-white-version/"
              rel="noopener noreferrer"
              target="_blank"
            >
              Pokémon Black & White
            </a>
            . The themes, the palettes, the mood... consider it an easter egg 🎮
          </p>
        </div>

        {/* Certification badge */}
        <div className={tw`flex flex-col items-center gap-4`}>
          <a
            aria-label="IBM Certified Node.js Application Developer credential"
            className={tw`group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 text-center transition-all hover:border-primary/40 hover:shadow-lg`}
            href="https://www.credly.com/badges/589bac2f-109c-4758-9aa8-495416bd0263/public_url"
            id="nodejs-certification-badge"
            rel="noopener noreferrer"
            target="_blank"
          >
            <div
              className={tw`flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/20`}
            >
              <CertificateIcon size={32} weight="duotone" />
            </div>
            <div>
              <p className={tw`text-xs font-semibold uppercase tracking-wider text-primary`}>
                IBM Certified
              </p>
              <p className={tw`mt-1 text-sm font-medium text-foreground`}>
                Node.js Application
                <br />
                Developer
              </p>
            </div>
            <div className={tw`flex items-center gap-1 text-xs text-muted-foreground`}>
              View credential
              <ArrowSquareOutIcon size={12} />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
