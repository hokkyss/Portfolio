'use server';

import 'server-only';

import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';

export type IconType = ForwardRefExoticComponent<
  SVGProps<SVGSVGElement> & {
    size?: number | string;
    title?: string;
  }
> &
  RefAttributes<SVGSVGElement>;

import {
  SiAngular,
  SiC,
  SiChakraui,
  SiCplusplus,
  SiCsharp,
  SiCss3,
  SiCssmodules,
  SiDjango,
  SiDocker,
  SiEslint,
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGo,
  SiHtml5,
  SiJavascript,
  SiJest,
  SiLinkedin,
  SiMariadb,
  SiMui,
  SiMysql,
  SiNestjs,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiReact,
  SiReactquery,
  SiRedux,
  SiSequelize,
  SiSimpleicons,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVitest,
} from '@icons-pack/react-simple-icons';
import GmailIcon from '@material-design-icons/svg/outlined/mail.svg';

const iconMap = {
  angular: SiAngular,
  c: SiC,
  'chakra-ui': SiChakraui,
  cpp: SiCplusplus,
  csharp: SiCsharp,
  css3: SiCss3,
  cssmodules: SiCssmodules,
  django: SiDjango,
  docker: SiDocker,
  eslint: SiEslint,
  express: SiExpress,
  fastapi: SiFastapi,
  firebase: SiFirebase,
  flask: SiFlask,
  git: SiGit,
  gmail: GmailIcon,
  go: SiGo,
  html5: SiHtml5,
  javascript: SiJavascript,
  jest: SiJest,
  linkedin: SiLinkedin,
  mariadb: SiMariadb,
  mui: SiMui,
  mysql: SiMysql,
  nestjs: SiNestjs,
  netlify: SiNetlify,
  'next.js': SiNextdotjs,
  'node.js': SiNodedotjs,
  'not-found': SiSimpleicons,
  postgresql: SiPostgresql,
  prisma: SiPrisma,
  python: SiPython,
  react: SiReact,
  'react-query': SiReactquery,
  redux: SiRedux,
  sequelize: SiSequelize,
  'styled-components': SiStyledcomponents,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  vercel: SiVercel,
  vitest: SiVitest,
};

type AvailableIcons = keyof typeof iconMap;

type IconProps = {
  name: AvailableIcons;
} & SVGProps<SVGSVGElement> & {
    size?: number | string;
    title?: string;
  };

async function Icon(props: IconProps) {
  const { name, ...rest } = props;

  const IconComponent: IconType = iconMap[name];

  return (
    <IconComponent role="img" {...rest} name={name} title={name === 'not-found' ? 'Icon Unavailable' : rest.title} />
  );
}

export default Object.assign(Icon, {
  getIconName(name: string): AvailableIcons {
    if (name in iconMap) {
      return name as AvailableIcons;
    }

    return 'not-found';
  },
});
