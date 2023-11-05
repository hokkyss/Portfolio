'use server';

import 'server-only';

import type { Experience } from '~/_common/models/experience.model';

import dynamic from 'next/dynamic';

import { cn, tw } from '~/_common/utils/classname.util';

import Section from '../atoms/section.atom';

const ExperienceCard = dynamic(() => import('./experience-card.molecule'));

interface ExperiencesProps {
  experiences: Experience[];
}

export default async function Experiences(props: ExperiencesProps) {
  const { experiences } = props;

  return (
    <Section
      className={cn(
        tw`flex h-fit min-h-screen flex-col items-start justify-normal gap-y-10 px-8 md:px-20`,
        tw`bg-gradient-to-b from-blue-600/50 to-amber-950/60 dark:from-blue-950/80 dark:to-amber-950/60`,
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
