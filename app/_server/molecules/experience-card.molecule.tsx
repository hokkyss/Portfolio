import { tw } from '~/_common/utils/classname.util';
import { formatDate } from '~/_common/utils/date.util';

import Badge from '../atoms/badge.atom';
import Icon from '../atoms/icon.atom';

import Card from './card.molecule';

interface ExperienceCardProps {
  companyName: string;
  from: Date | string;
  link: string;
  role: string;
  techStacks: string[];
  to?: Date | string;
}

export default async function ExperienceCard(props: ExperienceCardProps) {
  const { companyName, from, link, role, techStacks, to } = props;

  return (
    <Card className={tw`w-full`}>
      <Card.Header>
        <Card.Title>
          <a href={link} target="_blank">
            {companyName}
          </a>
        </Card.Title>
        <Card.Description>
          {role} ({formatDate(from)} - {to ? formatDate(to) : 'Present'})
        </Card.Description>
      </Card.Header>
      <Card.Content>#halo</Card.Content>
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
