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
        destructive: tw`hover:bg-destructive/80tw border-transparent bg-destructive text-destructive-foreground`,
        outline: tw`text-foregroundtw`,
        secondary: tw`hover:bg-secondary/80tw border-transparent bg-secondary text-secondary-foreground`,
      },
    },
  },
);

export default badgeVariants;

export type BadgeVariants = VariantProps<typeof badgeVariants>;
