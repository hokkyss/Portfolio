import format from 'date-fns/format';
import parse from 'date-fns/parse';

/**
 * Return JavaScript Date object, given a date string with a certain format.
 *
 * @example
 * ```ts
 * parseDate('2023-02-01'); // February 1st, 2023
 * parseDate('2022-01-00'); // Invalid Date
 * ```
 */
export function parseDate(dateString: string) {
  return parse(dateString, 'yyyy-MM-dd', new Date(0, 0, 0, 0, 0, 0, 0));
}

/**
 * Format a JavaScript Date object into month and year
 * @example
 * ```ts
 * const januaryFirst = new Date(2023, 0, 1);
 * const januarySecond = new Date(2023, 0, 2);
 *
 * formatDate(januaryFirst) --> Jan 2023
 * formatDate(januarySecond) --> Jan 2023
 * ```
 */
export function formatDate(date: Date) {
  return format(date, 'MMM yyyy');
}
