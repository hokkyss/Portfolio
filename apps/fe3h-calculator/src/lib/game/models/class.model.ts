import type { Stats } from '../../common/models/stats.model';

export interface ClassData {
  eligibility: ClassEligibility;
  /** Growth rate modifiers added to character's base growths */
  growthModifiers: Partial<Stats>;
  id: string;
  movement: number;
  name: string;
  tier: ClassTier;
}

export interface ClassEligibility {
  /** If set, only this gender can use this class */
  genderLock?: 'female' | 'male';
  /** If set, only these character IDs can use this class */
  uniqueTo?: string[];
}

export type ClassTier = 'Advanced' | 'Beginner' | 'Intermediate' | 'Master' | 'Special' | 'Unique';
