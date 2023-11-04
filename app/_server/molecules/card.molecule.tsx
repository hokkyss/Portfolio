'use server';

import 'server-only';

import type { HTMLAttributes } from 'react';

import { card, cardContent, cardDescription, cardFooter, cardHeader, cardTitle } from '~/_common/styles/card.style';
import { cn } from '~/_common/utils/classname.util';

async function CardRoot({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(card, className)} {...props} />;
}

async function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardHeader, className)} {...props} />;
}

async function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn(cardTitle, className)} {...props} />;
}

async function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn(cardDescription, className)} {...props} />;
}

async function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardContent, className)} {...props} />;
}

async function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(cardFooter, className)} {...props} />;
}

const Card = Object.assign(CardRoot, {
  Content: CardContent,
  Description: CardDescription,
  Footer: CardFooter,
  Header: CardHeader,
  Title: CardTitle,
});

export default Card;
