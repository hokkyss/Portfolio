import type { TechStackModel } from '../../lib/tech-stacks/models/tech-stack.model';

import cn from '@portfolio/design-system/cn';
import tw from '@portfolio/design-system/tw';

import { formatDate } from '../../lib/common/utils/date.util';
import LucideIcon from '../atoms/lucide-icon.atom';
import Card from '../molecules/card.molecule';

import Badge from '@portfolio/design-system/badge';
import Markdown from './markdown.organism';

interface ExperienceCardProps {
  companyName: string;
  description: string;
  /** ISO date string e.g. "2023-01-01" */
  from: string;
  id: string;
  link: string;
  role: string;
  techStacks: TechStackModel[];
  /** ISO date string or null/undefined for "Present" */
  to?: null | string;
}

/**
 *
 * @param props
 */
export default function ExperienceCard(props: ExperienceCardProps) {
  const { companyName, description, from, id, link, role, techStacks, to } = props;

  return (
    <Card className={tw`w-full`} id={`experiences-${id}`} role="article">
      <Card.Header>
        <Card.Title className={tw`relative`}>
          <a className={tw`hover:underline`} href={link} target="_blank">
            {companyName}
            <LucideIcon className={tw`mb-3 ml-1 inline h-3 w-3`} name="external-link" />
          </a>
        </Card.Title>
        <Card.Description>
          {role}
          {' '}
          (
          {formatDate(from)}
          {' '}
          -
          {to ? formatDate(to) : 'Present'}
          )
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Markdown allowedElements={['a', 'ul', 'ol', 'li', 'p']}>{description}</Markdown>
      </Card.Content>
      <Card.Footer className={cn(tw`flex-wrap gap-1`)}>
        {techStacks.map((tech) => (
          <Badge className={tw`gap-x-1`} key={tech.id} variant="secondary">
            {tech.name}
          </Badge>
        ))}
      </Card.Footer>
    </Card>
  );
}
