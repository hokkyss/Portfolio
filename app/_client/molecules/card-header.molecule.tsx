import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cardHeader } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div className={cn(cardHeader, className)} ref={ref} {...props} />
));
CardHeader.displayName = 'CardHeader';

export default CardHeader;
