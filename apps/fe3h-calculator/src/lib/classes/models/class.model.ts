import type { Stats } from '../../common/models/stats.model';

export type ClassTier = 'Advanced' | 'Beginner' | 'Intermediate' | 'Master' | 'Special' | 'Unique';

export interface ClassEligibility {
  /** If set, only this gender can use this class */
  genderLock?: 'female' | 'male';
  /** If set, only these character IDs can use this class */
  uniqueTo?: string[];
}

export interface ClassData {
  eligibility: ClassEligibility;
  /** Growth rate modifiers added to character's base growths */
  growthModifiers: Partial<Stats>;
  id: string;
  movement: number;
  name: string;
  /** Class stat caps — effective cap = min(character maxStat, class statCap) */
  statCaps: Stats;
  tier: ClassTier;
}
