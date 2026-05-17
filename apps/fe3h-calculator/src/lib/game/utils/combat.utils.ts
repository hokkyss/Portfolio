import type { Stats } from '../../common/models/stats.model';

export interface CombatUnit {
  stats: Stats;
  weaponWeight: number;
}

/**
 * Calculates Attack Speed (AS) for a given unit.
 * AS = Spd - max(0, WeaponWeight - Str / 5)
 */
export function calculateAttackSpeed(unit: CombatUnit): number {
  const weightPenalty = Math.max(0, unit.weaponWeight - Math.floor(unit.stats.str / 5));
  return unit.stats.spd - weightPenalty;
}

/**
 * Determines if the attacker doubles the defender.
 * Condition: Attacker AS >= Defender AS + 5
 */
export function isDoubling(attackerAS: number, defenderAS: number): boolean {
  return attackerAS >= defenderAS + 5;
}
