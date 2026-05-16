import type { Ability } from '../../abilities/models/ability.model';
import type { Character } from '../../characters/models/character.model';
import type { ClassData } from '../../classes/models/class.model';
import type { Stats } from '../../common/models/stats.model';

type StatKey = keyof Stats;

const STAT_KEYS: StatKey[] = ['hp', 'str', 'mag', 'dex', 'spd', 'lck', 'def', 'res', 'cha'];

/**
 * Effective growth rate = character base + class modifier + personal ability modifier.
 * @param character
 * @param cls
 * @param personalAbility
 */
export function calculateEffectiveGrowths(
  character: Character,
  cls: ClassData,
  personalAbility: Ability | null,
): Stats {
  const result = {} as Stats;

  for (const key of STAT_KEYS) {
    const base = character.growthRates[key];
    const classMod = cls.growthModifiers[key] ?? 0;
    const abilityMod = personalAbility?.modifiers.growths?.[key] ?? 0;
    result[key] = base + classMod + abilityMod;
  }

  return result;
}

export { STAT_KEYS };
export type { StatKey };
