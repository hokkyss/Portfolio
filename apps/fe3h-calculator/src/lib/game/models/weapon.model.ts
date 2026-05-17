export interface Weapon {
  crit: number;
  effectiveAgainst?: ('Armored' | 'Cavalry' | 'Flying' | 'Monster')[];
  hit: number;
  id: string;
  isMagic: boolean;
  might: number;
  name: string;
  range: [number, number]; // [min, max]
  rank: 'A' | 'B' | 'C' | 'D' | 'E' | 'S';
  type: WeaponType;
  uses: number;
  weight: number;
}

export type WeaponType = 'Axe' | 'Bow' | 'Brawling' | 'Faith' | 'Lance' | 'Reason' | 'Sword';
