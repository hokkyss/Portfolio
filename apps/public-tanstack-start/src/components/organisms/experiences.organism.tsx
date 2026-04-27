import type { ExperienceModel } from '../../lib/experiences/models/experience.model';

import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

import Section from '../atoms/section.atom';

import ExperienceCard from './experience-card.organism';

interface ExperiencesProps {
  experiences: ExperienceModel[];
}

export default function Experiences({ experiences }: ExperiencesProps) {
  return (
    <Section
      className={cn(
        tw`flex h-fit min-h-screen flex-col items-start justify-normal gap-y-10 px-8 md:px-20`,
        tw`bg-linear-to-b from-blue-600/50 to-amber-950/60 dark:from-blue-950/80 dark:to-amber-950/60`,
      )}
      id="experiences"
    >
      <h1 className={tw`self-center text-4xl font-bold`}>Experiences</h1>
      <div className={tw`flex w-full flex-col gap-y-2`}>
        {experiences.map((exp) => (
          <ExperienceCard
            companyName={exp.company.name}
            description={exp.description}
            from={exp.from}
            id={exp.id}
            key={exp.id}
            link={exp.company.link}
            role={exp.role}
            techStacks={exp.techStacks}
            to={exp.to}
          />
        ))}
      </div>
    </Section>
  );
}
