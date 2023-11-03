import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cardContent } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={cn(cardContent, className)} ref={ref} {...props} />
));
CardContent.displayName = 'CardContent';

export default CardContent;
