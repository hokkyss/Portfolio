import type { Character } from '../models/character.model';

export const BYLETH_M: Character = {
  baseStats: {
    cha: 7,
    def: 6,
    dex: 9,
    hp: 27,
    lck: 8,
    mag: 6,
    res: 6,
    spd: 8,
    str: 13,
  },
  crests: [
    {
      description: 'Occasionally restores HP equal to 30% of damage dealt. Rarely raises Mt and stops counterattacks.',
      name: 'Flames',
      type: 'Major',
    },
  ],
  faction: 'Church of Seiros',
  growthRates: {
    cha: 45,
    def: 35,
    dex: 45,
    hp: 45,
    lck: 45,
    mag: 35,
    res: 30,
    spd: 45,
    str: 45,
  },
  id: 'byleth_m',
  maxStats: {
    cha: 88,
    def: 68,
    dex: 87,
    hp: 99,
    lck: 87,
    mag: 68,
    res: 59,
    spd: 87,
    str: 88,
  },
  name: 'Byleth (M)',
  personalAbilityId: 'professor_guidance',
};

export const EDELGARD: Character = {
  baseStats: {
    cha: 10,
    def: 6,
    dex: 5,
    hp: 29,
    lck: 5,
    mag: 6,
    res: 4,
    spd: 8,
    str: 13,
  },
  crests: [
    {
      description: 'Occasionally raises Mt when using combat arts.',
      name: 'Seiros',
      type: 'Minor',
    },
    {
      description: 'Occasionally restores HP equal to 30% of damage dealt. Rarely raises Mt and stops counterattacks.',
      name: 'Flames',
      type: 'Minor',
    },
  ],
  faction: 'Black Eagles',
  growthRates: {
    cha: 60,
    def: 35,
    dex: 45,
    hp: 40,
    lck: 30,
    mag: 45,
    res: 35,
    spd: 40,
    str: 55,
  },
  id: 'edelgard',
  maxStats: {
    cha: 99,
    def: 66,
    dex: 78,
    hp: 92,
    lck: 58,
    mag: 76,
    res: 63,
    spd: 73,
    str: 89,
  },
  name: 'Edelgard',
  personalAbilityId: 'imperial_lineage',
};

export const CHARACTERS: Record<string, Character> = {
  [BYLETH_M.id]: BYLETH_M,
  [EDELGARD.id]: EDELGARD,
};
