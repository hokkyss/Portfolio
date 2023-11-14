import type { VariantProps } from 'class-variance-authority';

import { cva } from 'class-variance-authority';

import { tw } from '../utils/classname.util';

const badgeVariants = cva(
  tw`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2`,
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: tw`border-transparent bg-primary text-primary-foreground hover:bg-primary/80`,
        destructive: tw`border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80`,
        outline: tw`text-foreground`,
        secondary: tw`border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`,
      },
    },
  },
);

export default badgeVariants;

export type BadgeVariants = VariantProps<typeof badgeVariants>;
