import format from 'date-fns/format';
import parse from 'date-fns/parse';

export function formatDate(date: Date | number | string) {
  const dateInstance = typeof date === 'string' ? parse(date, 'yyyy-MM-dd', new Date(0, 0, 0, 0, 0, 0, 0)) : date;

  return format(dateInstance, 'MMM yyyy');
}
