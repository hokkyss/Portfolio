import type { WeaponType } from './weapon.model';

export interface CombatArt {
  consecutiveHits?: number; // E.g., Swift Strikes hits twice
  cost: number;
  description: string;
  effectiveAgainst?: ('Armored' | 'Cavalry' | 'Flying' | 'Monster')[];
  id: string;
  // Specific effects like effective damage, magic damage on physical weapon, etc.
  isMagic?: boolean;
  modifiers: CombatArtModifiers;
  name: string;
  rangeModifier?: [number, number]; // Added to weapon range, e.g. [0, 1]
  weaponType: 'Any' | WeaponType;
}

export interface CombatArtModifiers {
  avo: number;
  crit: number;
  hit: number;
  might: number;
}
