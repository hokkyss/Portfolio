import type { IconProps as PhosphorIconProps } from '@phosphor-icons/react';

import {
  AppleLogoIcon,
  ArrowSquareOutIcon,
  CircleNotchIcon,
  GithubLogoIcon,
  GooglePlayLogoIcon,
} from '@phosphor-icons/react';

const iconMap = {
  apple: AppleLogoIcon,
  'external-link': ArrowSquareOutIcon,
  github: GithubLogoIcon,
  'loader-2': CircleNotchIcon,
  play: GooglePlayLogoIcon,
} as const;

export type LucideIconName = keyof typeof iconMap;

type LucideIconProps = {
  name: LucideIconName;
} & PhosphorIconProps;

/**
 *
 * @param root0
 * @param root0.name
 */
export default function LucideIcon({ name, ...rest }: LucideIconProps) {
  const Icon = iconMap[name];

  return <Icon {...rest} />;
}
