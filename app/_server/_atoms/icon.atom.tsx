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
  SiExpress,
  SiFastapi,
  SiFirebase,
  SiFlask,
  SiGit,
  SiGo,
  SiHtml5,
  SiJavascript,
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
} from '@icons-pack/react-simple-icons';
import GmailIcon from '@material-design-icons/svg/outlined/mail.svg';

const Icon: Record<string, IconType> = {
  angular: SiAngular,
  c: SiC,
  'chakra-ui': SiChakraui,
  cpp: SiCplusplus,
  csharp: SiCsharp,
  css3: SiCss3,
  cssmodules: SiCssmodules,
  default: SiSimpleicons,
  django: SiDjango,
  docker: SiDocker,
  express: SiExpress,
  fastapi: SiFastapi,
  firebase: SiFirebase,
  flask: SiFlask,
  git: SiGit,
  gmail: GmailIcon,
  go: SiGo,
  html5: SiHtml5,
  javascript: SiJavascript,
  linkedin: SiLinkedin,
  mariadb: SiMariadb,
  mui: SiMui,
  mysql: SiMysql,
  nestjs: SiNestjs,
  netlify: SiNetlify,
  'next.js': SiNextdotjs,
  'node.js': SiNodedotjs,
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
};

export default Icon;
