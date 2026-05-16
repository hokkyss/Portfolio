import type { Ability } from '../models/ability.model';

/**
 * Aptitude — Cyril's personal ability.
 * Gives +20% to ALL growth rates.
 */
export const APTITUDE: Ability = {
  id: 'aptitude',
  name: 'Aptitude',
  condition: 'Always',
  description: '+20% to all growth rates.',
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
};

/**
 * All personal abilities indexed by ID.
 */
export const ABILITIES: Record<string, Ability> = {
  [APTITUDE.id]: APTITUDE,
};
