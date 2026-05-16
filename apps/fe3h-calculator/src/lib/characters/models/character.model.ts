import type { Stats } from '../../common/models/stats.model';

export interface Character {
  baseStats: Stats;
  crests: Crest[];
  faction: CharacterFaction;
  gender: CharacterGender;
  growthRates: Stats;
  id: string;
  maxStats: Stats;
  name: string;
  /** ID of personal ability (may affect growth rates) */
  personalAbilityId: null | string;
}

export type CharacterFaction = 'Ashen Wolves' | 'Black Eagles' | 'Blue Lions' | 'Church of Seiros' | 'Golden Deer' | 'Other';

export type CharacterGender = 'female' | 'male';
export interface Crest {
  description: string;
  name: string;
  type: CrestType;
}

export type CrestType = 'Major' | 'Minor' | 'None';
