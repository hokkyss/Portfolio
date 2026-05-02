import tw from '@portfolio/design-system/tw';
import type { TechModel } from '../../lib/tech-stacks/models/tech.model';

interface TechStackSectionProps {
  techGroups: TechModel[];
}

/**
 * Displays grouped tech stacks in a visual chip layout.
 * @param root0
 * @param root0.techGroups
 */
export default function TechStackSection({ techGroups }: TechStackSectionProps) {
  return (
    <section className={tw`bg-muted/30 py-24`} id="tech-stacks">
      <div className={tw`mx-auto max-w-6xl px-6`}>
        <p className={tw`mb-3 font-mono text-xs tracking-widest text-primary uppercase`}>
          $ cat ./tech-stacks.json
        </p>
        <h2 className={tw`mb-12 text-4xl font-bold tracking-tight`}>Tech Stacks</h2>

        <div className={tw`flex flex-col gap-8`}>
          {techGroups.map((group) => (
            <div key={group.id}>
              <h3
                className={tw`mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground`}
              >
                {group.name}
              </h3>
              <div className={tw`flex flex-wrap gap-2`}>
                {group.techStacks.map((stack) => (
                  <span
                    className={tw`inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-primary/5`}
                    key={stack.id}
                  >
                    {stack.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
