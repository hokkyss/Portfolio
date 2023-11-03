import type { ClassValue } from 'clsx';

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tw(template: TemplateStringsArray, ...substitutions: unknown[]): string;
export function tw(className: string): string;
export function tw(val: TemplateStringsArray | string, ...substitutions: unknown[]) {
  if (typeof val === 'string') {
    return cn(val);
  }

  if (substitutions.length > 0) {
    throw new Error('Tailwind classes cannot be created dynamically at runtime');
  }

  return cn(String.raw(val, substitutions));
}
