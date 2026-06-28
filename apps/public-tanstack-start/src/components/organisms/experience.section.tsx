import Badge from '@portfolio/design-system/badge';
import tw from '@portfolio/design-system/tw';
import { useSuspenseQuery } from '@tanstack/react-query';
import getExperiencesQuery from '../../lib/experiences/queries/get-experiences.query';
import ExperienceCard from '../molecules/experience-card.molecule';

/**
 * Experience timeline section.
 */
export default function ExperienceSection() {
  const { data: experiences } = useSuspenseQuery(getExperiencesQuery({}));

  return (
    <section className={tw`mx-auto max-w-6xl px-6 py-24 w-full`} id="experience">
      <Badge
        className={tw`mb-3 font-mono text-xs tracking-widest uppercase`}
        variant="secondary"
      >
        $ git log --oneline
      </Badge>
      <h2 className={tw`mb-12 text-4xl font-bold tracking-tight`}>Experience</h2>
      <div className={tw`flex flex-col w-full items-stretch`}>
        {experiences.map((exp, i) => (
          <ExperienceCard
            experience={exp}
            isLast={i === experiences.length - 1}
            key={exp.id}
          />
        ))}
      </div>
    </section>
  );
}
