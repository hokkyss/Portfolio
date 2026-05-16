import type { Stats } from '../../common/models/stats.model';

export interface Character {
  baseStats: Stats;
  crests: Crest[];
  faction: 'Ashen Wolves' | 'Black Eagles' | 'Blue Lions' | 'Church of Seiros' | 'Golden Deer' | 'Other';
  growthRates: Stats;
  id: string;
  maxStats: Stats;
  name: string;
  personalAbilityId: string;
}

export interface Crest {
  description: string;
  name: string;
  type: CrestType;
}

export type CrestType = 'Major' | 'Minor' | 'None';
