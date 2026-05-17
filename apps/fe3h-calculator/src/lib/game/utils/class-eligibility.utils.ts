import type { Character } from '../models/character.model';
import type { ClassData } from '../models/class.model';

/**
 * Returns all classes eligible for the given character.
 * @param character
 * @param allClasses
 */
export function getEligibleClasses(character: Character, allClasses: ClassData[]): ClassData[] {
  return allClasses.filter((cls) => isClassEligible(character, cls));
}

/**
 * Returns true if the character is eligible for the given class.
 * Gender-locked and unique-class rules are enforced.
 * @param character
 * @param cls
 */
export function isClassEligible(character: Character, cls: ClassData): boolean {
  const { eligibility } = cls;

  if (eligibility.genderLock && eligibility.genderLock !== character.gender) {
    return false;
  }

  if (eligibility.uniqueTo && !eligibility.uniqueTo.includes(character.id)) {
    return false;
  }

  return true;
}
