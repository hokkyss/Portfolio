import { ArrowSquareOutIcon, CalendarIcon } from '@phosphor-icons/react';
import Badge from '@portfolio/design-system/badge';
import Card from '@portfolio/design-system/card';
import CardContent from '@portfolio/design-system/card-content';
import tw from '@portfolio/design-system/tw';
import type { ExperienceModel } from '../../lib/experiences/models/experience.model';

interface ExperienceCardProps {
  experience: ExperienceModel;
  isLast?: boolean;
}

/**
 * Single experience card in the timeline.
 * @param root0
 * @param root0.experience
 * @param root0.isLast
 */
export default function ExperienceCard({ experience, isLast }: ExperienceCardProps) {
  const { company, description, from, role, techStacks, to } = experience;
  const startDate = formatDate(from);
  const endDate = to ? formatDate(to) : 'Present';
  const bullets = description.split('\n').filter(Boolean);

  return (
    <div className={tw`relative flex gap-6`}>
      {/* Timeline line */}
      <div className={tw`flex flex-col items-center`}>
        <div className={tw`mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-primary bg-background`} />
        {!isLast && <div className={tw`mt-1 flex-1 w-px bg-border`} />}
      </div>

      {/* Content */}
      <Card className={tw`mb-10 flex-1 transition-colors hover:border-primary/30`}>
        <CardContent className={tw`p-5`}>
          <div className={tw`flex flex-wrap items-start justify-between gap-2`}>
            <div>
              <h3 className={tw`font-semibold text-foreground`}>{role}</h3>
              <a
                className={tw`flex items-center gap-1 text-sm text-primary hover:underline`}
                href={company.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                {company.name}
                <ArrowSquareOutIcon size={12} />
              </a>
            </div>
            <div className={tw`flex items-center gap-1.5 text-xs text-muted-foreground`}>
              <CalendarIcon size={12} />
              {startDate}
              {' '}
              —
              {endDate}
            </div>
          </div>

          {/* Description bullets */}
          {bullets.length > 0 && (
            <ul className={tw`mt-3 flex flex-col gap-1.5`}>
              {bullets.map((b) => (
                <li className={tw`flex gap-2 text-sm text-muted-foreground`} key={b}>
                  <span className={tw`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary`} />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Tech stacks */}
          <div className={tw`mt-4 flex flex-wrap gap-2`}>
            {techStacks.map((stack) => (
              <Badge key={stack.id} variant="secondary">
                {stack.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Formats an ISO date string to "MMM YYYY" (e.g. "Jan 2023").
 * @param iso
 */
function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}
