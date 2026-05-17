import type { Stats } from '../../common/models/stats.model';

export interface Ability {
  // If the ability only applies under certain conditions
  condition?: 'Always' | 'Defending' | 'HP <= 50%' | 'Initiating';
  description: string;
  id: string;
  modifiers: AbilityModifiers;
  name: string;
}

export interface AbilityModifiers {
  avo?: number;
  crit?: number;
  critAvo?: number; // Dodge
  // Growth modifiers (e.g. Aptitude gives +20% to all growths)
  growths?: Partial<Stats>;
  // Combat specific
  hit?: number;
  // Stat additions (e.g. +6 Str when initiating)
  stats?: Partial<Stats>;
  // Other effects could be booleans or specialized types
  // e.g. vantage, desperation, etc.
}
