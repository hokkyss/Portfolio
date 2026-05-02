import tw from '@portfolio/design-system/tw';
import type { GetExperienceResponseDto } from '../../lib/experiences/dto/get-experience.dto';
import ExperienceCard from '../molecules/experience-card.molecule';

interface ExperienceSectionProps {
  experiences: GetExperienceResponseDto;
}

/**
 * Experience timeline section.
 * @param root0
 * @param root0.experiences
 */
export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section className={tw`mx-auto max-w-6xl px-6 py-24`} id="experience">
      <p className={tw`mb-3 font-mono text-xs tracking-widest text-primary uppercase`}>
        $ git log --oneline
      </p>
      <h2 className={tw`mb-12 text-4xl font-bold tracking-tight`}>Experience</h2>

      <div className={tw`max-w-3xl`}>
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
