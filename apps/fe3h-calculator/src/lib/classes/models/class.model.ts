import type { Stats } from '../../common/models/stats.model';

export interface ClassData {
  classAbilities: string[]; // IDs of abilities
  growthModifiers: Partial<Stats>;
  id: string;
  movement: number;
  name: string;
  statModifiers: Partial<Stats>;
  tier: ClassTier;
}

export type ClassTier = 'Advanced' | 'Beginner' | 'Intermediate' | 'Master' | 'Special' | 'Unique';
