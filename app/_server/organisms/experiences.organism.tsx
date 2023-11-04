import { cn, tw } from '~/_common/utils/classname.util';

import Section from '../atoms/section.atom';
import ExperienceCard from '../molecules/experience-card.molecule';

export default async function Experiences() {
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
        <ExperienceCard
          companyName="Nomura Research Institute Indonesia"
          from="2023-04-03"
          link="https://www.linkedin.com/company/75485763/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D"
          role="Front End Engineer"
          techStacks={['react', 'redux', 'typescript', 'tailwindcss']}
        />
        <ExperienceCard
          companyName="Nomura Research Institute Indonesia"
          from="2023-04-03"
          link="https://www.linkedin.com/company/75485763/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base%3BlYHY3RbkRGGTpzgZLrnmjA%3D%3D"
          role="Front End Engineer"
          techStacks={['react', 'redux', 'typescript', 'tailwindcss']}
        />
      </div>
    </Section>
  );
}
