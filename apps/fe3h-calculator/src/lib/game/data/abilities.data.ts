import type { Ability } from '../models/ability.model';

/**
 * Aptitude — Cyril's personal ability.
 * Gives +20% to ALL growth rates.
 */
export const APTITUDE: Ability = {
  condition: 'Always',
  description: '+20% to all growth rates.',
  id: 'aptitude',
  modifiers: {
    growths: {
      cha: 20,
      def: 20,
      dex: 20,
      hp: 20,
      lck: 20,
      mag: 20,
      res: 20,
      spd: 20,
      str: 20,
    },
  },
  name: 'Aptitude',
};

/**
 * All personal abilities indexed by ID.
 */
export const ABILITIES: Record<string, Ability> = {
  [APTITUDE.id]: APTITUDE,
};
