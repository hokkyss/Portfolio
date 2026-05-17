export interface Battalion {
  endurance: number;
  gambitId?: string;
  id: string;
  modifiers: BattalionModifiers;
  name: string;
  rank: 'A' | 'B' | 'C' | 'D' | 'E';
  type: BattalionType;
}

export interface BattalionModifiers {
  avo: number;
  cha: number;
  crit: number;
  hit: number;
  magAtk: number;
  physAtk: number;
  prt: number; // Protection (Def)
  rsl: number; // Resilience (Res)
}

export type BattalionType = 'Magical' | 'Physical';
