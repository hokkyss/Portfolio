'use server';

import 'server-only';

import { tw } from '~/_common/utils/classname.util';
import { formatDate } from '~/_common/utils/date.util';

import Badge from '../atoms/badge.atom';
import Icon from '../atoms/icon.atom';
import LucideIcon from '../atoms/lucide-icon.atom';
import Card from '../molecules/card.molecule';

import Markdown from './markdown.organism';

interface ExperienceCardProps {
  companyName: string;
  description: string;
  from: Date;
  link: string;
  role: string;
  techStacks: string[];
  to?: Date | null;
}

export default async function ExperienceCard(props: ExperienceCardProps) {
  const { companyName, description, from, link, role, techStacks, to } = props;

  return (
    <Card className={tw`w-full`}>
      <Card.Header>
        <Card.Title className={tw`relative hover:underline`}>
          <a href={link} target="_blank">
            {companyName}
            <LucideIcon className={tw`mb-3 ml-1 inline h-3 w-3`} name="external-link" />
          </a>
        </Card.Title>
        <Card.Description>
          {role} ({formatDate(from)} - {to ? formatDate(to) : 'Present'})
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Markdown allowedElements={['a', 'ul', 'ol', 'li', 'p']}>{description}</Markdown>
      </Card.Content>
      <Card.Footer className={tw`flex-wrap gap-1`}>
        {techStacks.map((tech) => (
          <Badge className={tw`gap-x-1`} key={tech} variant="secondary">
            <Icon className={tw`h-3 w-3`} name={Icon.getIconName(tech)} />
            {tech}
          </Badge>
        ))}
      </Card.Footer>
    </Card>
  );
}
