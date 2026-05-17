import { describe, expect, it } from 'vitest';
import { calculateAttackSpeed, isDoubling } from './combat.utils';

describe('Combat Utilities', () => {
  describe('calculateAttackSpeed', () => {
    it('calculates AS correctly when weight penalty applies', () => {
      const unit = {
        stats: { cha: 5, def: 5, dex: 10, hp: 30, lck: 10, mag: 0, res: 5, spd: 15, str: 10 },
        weaponWeight: 5, // Wt 5 - (Str 10 / 5) = 5 - 2 = 3 weight penalty
      };
      // AS = 15 - 3 = 12
      expect(calculateAttackSpeed(unit)).toBe(12);
    });

    it('calculates AS correctly when strength completely mitigates weight', () => {
      const unit = {
        stats: { cha: 5, def: 5, dex: 10, hp: 30, lck: 10, mag: 0, res: 5, spd: 15, str: 25 },
        weaponWeight: 4, // Wt 4 - (Str 25 / 5) = 4 - 5 = -1 (max to 0 penalty)
      };
      // AS = 15 - 0 = 15
      expect(calculateAttackSpeed(unit)).toBe(15);
    });
  });

  describe('isDoubling', () => {
    it('returns true if attacker AS is exactly 5 more than defender AS', () => {
      expect(isDoubling(15, 10)).toBe(true);
    });

    it('returns true if attacker AS is more than 5 higher than defender AS', () => {
      expect(isDoubling(20, 10)).toBe(true);
    });

    it('returns false if attacker AS is less than 5 higher than defender AS', () => {
      expect(isDoubling(14, 10)).toBe(false);
    });

    it('returns false if attacker AS is equal to or less than defender AS', () => {
      expect(isDoubling(10, 10)).toBe(false);
      expect(isDoubling(5, 10)).toBe(false);
    });
  });
});
