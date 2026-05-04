import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 *
 * @param inputs
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function tw(
  template: TemplateStringsArray,
): string;
export function tw(className: string): string;
/**
 *
 * @param val
 */
export function tw(
  val: string | TemplateStringsArray,
) {
  if (typeof val === 'string') {
    return val;
  }

  return String.raw({ raw: val });
}
