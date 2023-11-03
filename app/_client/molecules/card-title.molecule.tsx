import type { HTMLAttributes } from 'react';

import { forwardRef } from 'react';

import { cardTitle } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const CardTitle = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => <h3 className={cn(cardTitle, className)} ref={ref} {...props} />,
);
CardTitle.displayName = 'CardTitle';

export default CardTitle;
