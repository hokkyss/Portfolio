'use server';

import 'server-only';

import type { HTMLAttributes } from 'react';

import { card, cardContent, cardDescription, cardFooter, cardHeader, cardTitle } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

const CardRoot = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(card, className)} {...props} />
);

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(cardHeader, className)} {...props} />
);

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn(cardTitle, className)} {...props} />
);

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn(cardDescription, className)} {...props} />
);

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(cardContent, className)} {...props} />
);

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={cn(cardFooter, className)} {...props} />
);

const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});

export default Card;
