import type { ClassData } from '../models/class.model';

// Stat caps and growth modifiers sourced from:
// https://serenesforest.net/three-houses/classes/

// ─── BEGINNER ────────────────────────────────────────────────────────────────

const COMMONER: ClassData = {
  eligibility: {},
  growthModifiers: {},
  id: 'commoner',
  movement: 4,
  name: 'Commoner',
  statCaps: { cha: 26, def: 20, dex: 20, hp: 40, lck: 25, mag: 20, res: 20, spd: 20, str: 20 },
  tier: 'Beginner',
};

const NOBLE: ClassData = {
  eligibility: {},
  growthModifiers: {},
  id: 'noble',
  movement: 4,
  name: 'Noble',
  statCaps: { cha: 26, def: 20, dex: 20, hp: 40, lck: 25, mag: 20, res: 20, spd: 20, str: 20 },
  tier: 'Beginner',
};

const MYRMIDON: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 10 },
  id: 'myrmidon',
  movement: 4,
  name: 'Myrmidon',
  statCaps: { cha: 26, def: 20, dex: 25, hp: 40, lck: 25, mag: 20, res: 20, spd: 25, str: 20 },
  tier: 'Beginner',
};

const SOLDIER: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, str: 10 },
  id: 'soldier',
  movement: 4,
  name: 'Soldier',
  statCaps: { cha: 26, def: 23, dex: 20, hp: 40, lck: 25, mag: 20, res: 20, spd: 20, str: 23 },
  tier: 'Beginner',
};

const FIGHTER: ClassData = {
  eligibility: {},
  growthModifiers: { hp: 10, str: 10 },
  id: 'fighter',
  movement: 4,
  name: 'Fighter',
  statCaps: { cha: 26, def: 20, dex: 20, hp: 45, lck: 25, mag: 20, res: 20, spd: 20, str: 25 },
  tier: 'Beginner',
};

const MONK: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 10, res: 10 },
  id: 'monk',
  movement: 4,
  name: 'Monk',
  statCaps: { cha: 26, def: 20, dex: 20, hp: 40, lck: 25, mag: 25, res: 23, spd: 20, str: 20 },
  tier: 'Beginner',
};

// ─── INTERMEDIATE ─────────────────────────────────────────────────────────────

const LORD: ClassData = {
  eligibility: { uniqueTo: ['edelgard', 'dimitri', 'claude'] },
  growthModifiers: { dex: 10, str: 10 },
  id: 'lord',
  movement: 5,
  name: 'Lord',
  statCaps: { cha: 30, def: 23, dex: 25, hp: 45, lck: 29, mag: 22, res: 22, spd: 22, str: 25 },
  tier: 'Intermediate',
};

const MERCENARY: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 10 },
  id: 'mercenary',
  movement: 5,
  name: 'Mercenary',
  statCaps: { cha: 28, def: 22, dex: 27, hp: 45, lck: 28, mag: 20, res: 20, spd: 27, str: 25 },
  tier: 'Intermediate',
};

const THIEF: ClassData = {
  eligibility: {},
  growthModifiers: { lck: 10, spd: 10 },
  id: 'thief',
  movement: 5,
  name: 'Thief',
  statCaps: { cha: 28, def: 20, dex: 25, hp: 43, lck: 30, mag: 20, res: 20, spd: 30, str: 23 },
  tier: 'Intermediate',
};

const CAVALIER: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, str: 10 },
  id: 'cavalier',
  movement: 7,
  name: 'Cavalier',
  statCaps: { cha: 27, def: 26, dex: 22, hp: 46, lck: 27, mag: 20, res: 20, spd: 22, str: 26 },
  tier: 'Intermediate',
};

const ARMOR_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { def: 20, str: 10 },
  id: 'armor-knight',
  movement: 4,
  name: 'Armor Knight',
  statCaps: { cha: 24, def: 34, dex: 20, hp: 50, lck: 25, mag: 18, res: 22, spd: 18, str: 30 },
  tier: 'Intermediate',
};

const BRIGAND: ClassData = {
  eligibility: {},
  growthModifiers: { hp: 10, str: 20 },
  id: 'brigand',
  movement: 5,
  name: 'Brigand',
  statCaps: { cha: 25, def: 22, dex: 22, hp: 50, lck: 25, mag: 18, res: 18, spd: 22, str: 30 },
  tier: 'Intermediate',
};

const ARCHER: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 15, spd: 5 },
  id: 'archer',
  movement: 4,
  name: 'Archer',
  statCaps: { cha: 27, def: 22, dex: 28, hp: 43, lck: 27, mag: 20, res: 20, spd: 25, str: 24 },
  tier: 'Intermediate',
};

const BRAWLER: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { spd: 10, str: 15 },
  id: 'brawler',
  movement: 5,
  name: 'Brawler',
  statCaps: { cha: 25, def: 22, dex: 25, hp: 47, lck: 25, mag: 18, res: 18, spd: 28, str: 30 },
  tier: 'Intermediate',
};

const MAGE: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 20, res: 10 },
  id: 'mage',
  movement: 4,
  name: 'Mage',
  statCaps: { cha: 27, def: 19, dex: 22, hp: 40, lck: 27, mag: 30, res: 25, spd: 22, str: 18 },
  tier: 'Intermediate',
};

const DARK_MAGE: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { hp: 10, mag: 20 },
  id: 'dark-mage',
  movement: 4,
  name: 'Dark Mage',
  statCaps: { cha: 24, def: 20, dex: 22, hp: 45, lck: 24, mag: 30, res: 22, spd: 22, str: 20 },
  tier: 'Intermediate',
};

const PRIEST: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 10, res: 20 },
  id: 'priest',
  movement: 4,
  name: 'Priest',
  statCaps: { cha: 28, def: 18, dex: 22, hp: 40, lck: 27, mag: 27, res: 28, spd: 22, str: 18 },
  tier: 'Intermediate',
};

// ─── ADVANCED ─────────────────────────────────────────────────────────────────

const HERO: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { dex: 10, spd: 10, str: 10 },
  id: 'hero',
  movement: 5,
  name: 'Hero',
  statCaps: { cha: 30, def: 25, dex: 30, hp: 55, lck: 30, mag: 20, res: 20, spd: 30, str: 33 },
  tier: 'Advanced',
};

const SWORDMASTER: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 15 },
  id: 'swordmaster',
  movement: 6,
  name: 'Swordmaster',
  statCaps: { cha: 30, def: 23, dex: 33, hp: 50, lck: 30, mag: 20, res: 20, spd: 37, str: 28 },
  tier: 'Advanced',
};

const ASSASSIN: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, lck: 10, spd: 10 },
  id: 'assassin',
  movement: 6,
  name: 'Assassin',
  statCaps: { cha: 30, def: 22, dex: 32, hp: 50, lck: 35, mag: 20, res: 22, spd: 35, str: 28 },
  tier: 'Advanced',
};

const FORTRESS_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { def: 20, hp: 10, str: 10 },
  id: 'fortress-knight',
  movement: 4,
  name: 'Fortress Knight',
  statCaps: { cha: 25, def: 42, dex: 22, hp: 60, lck: 25, mag: 18, res: 25, spd: 18, str: 38 },
  tier: 'Advanced',
};

const PALADIN: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, dex: 10, str: 10 },
  id: 'paladin',
  movement: 8,
  name: 'Paladin',
  statCaps: { cha: 30, def: 30, dex: 28, hp: 55, lck: 30, mag: 22, res: 22, spd: 25, str: 33 },
  tier: 'Advanced',
};

const WYVERN_RIDER: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, str: 15 },
  id: 'wyvern-rider',
  movement: 7,
  name: 'Wyvern Rider',
  statCaps: { cha: 28, def: 30, dex: 25, hp: 55, lck: 25, mag: 18, res: 18, spd: 25, str: 35 },
  tier: 'Advanced',
};

const WARRIOR: ClassData = {
  eligibility: {},
  growthModifiers: { hp: 20, str: 15 },
  id: 'warrior',
  movement: 5,
  name: 'Warrior',
  statCaps: { cha: 27, def: 25, dex: 25, hp: 65, lck: 25, mag: 18, res: 18, spd: 22, str: 40 },
  tier: 'Advanced',
};

const SNIPER: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 20, spd: 5 },
  id: 'sniper',
  movement: 5,
  name: 'Sniper',
  statCaps: { cha: 30, def: 25, dex: 38, hp: 55, lck: 30, mag: 20, res: 22, spd: 30, str: 30 },
  tier: 'Advanced',
};

const GRAPPLER: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { dex: 10, spd: 10, str: 20 },
  id: 'grappler',
  movement: 5,
  name: 'Grappler',
  statCaps: { cha: 26, def: 25, dex: 30, hp: 60, lck: 25, mag: 18, res: 18, spd: 32, str: 40 },
  tier: 'Advanced',
};

const WARLOCK: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, mag: 20 },
  id: 'warlock',
  movement: 4,
  name: 'Warlock',
  statCaps: { cha: 27, def: 20, dex: 27, hp: 45, lck: 27, mag: 40, res: 27, spd: 22, str: 18 },
  tier: 'Advanced',
};

const BISHOP: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 15, res: 15 },
  id: 'bishop',
  movement: 4,
  name: 'Bishop',
  statCaps: { cha: 30, def: 19, dex: 25, hp: 45, lck: 30, mag: 35, res: 35, spd: 22, str: 18 },
  tier: 'Advanced',
};

const DARK_BISHOP: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { hp: 10, mag: 20, res: 10 },
  id: 'dark-bishop',
  movement: 4,
  name: 'Dark Bishop',
  statCaps: { cha: 25, def: 22, dex: 24, hp: 48, lck: 24, mag: 38, res: 30, spd: 20, str: 18 },
  tier: 'Advanced',
};

const VALKYRIE: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 15, spd: 5 },
  id: 'valkyrie',
  movement: 8,
  name: 'Valkyrie',
  statCaps: { cha: 30, def: 22, dex: 27, hp: 48, lck: 28, mag: 35, res: 30, spd: 30, str: 20 },
  tier: 'Advanced',
};

const PEGASUS_KNIGHT: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 10, res: 10, spd: 10 },
  id: 'pegasus-knight',
  movement: 7,
  name: 'Pegasus Knight',
  statCaps: { cha: 30, def: 22, dex: 28, hp: 45, lck: 30, mag: 25, res: 27, spd: 32, str: 25 },
  tier: 'Advanced',
};

// ─── MASTER ───────────────────────────────────────────────────────────────────

const FALCON_KNIGHT: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 10, res: 10, spd: 15 },
  id: 'falcon-knight',
  movement: 8,
  name: 'Falcon Knight',
  statCaps: { cha: 35, def: 24, dex: 33, hp: 55, lck: 35, mag: 28, res: 32, spd: 42, str: 30 },
  tier: 'Master',
};

const WYVERN_LORD: ClassData = {
  eligibility: {},
  growthModifiers: { def: 15, str: 20 },
  id: 'wyvern-lord',
  movement: 8,
  name: 'Wyvern Lord',
  statCaps: { cha: 30, def: 38, dex: 28, hp: 65, lck: 28, mag: 18, res: 18, spd: 28, str: 43 },
  tier: 'Master',
};

const MORTAL_SAVANT: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, mag: 10, spd: 10 },
  id: 'mortal-savant',
  movement: 6,
  name: 'Mortal Savant',
  statCaps: { cha: 32, def: 24, dex: 35, hp: 55, lck: 30, mag: 35, res: 25, spd: 37, str: 28 },
  tier: 'Master',
};

const GREAT_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { def: 20, hp: 10, str: 10 },
  id: 'great-knight',
  movement: 6,
  name: 'Great Knight',
  statCaps: { cha: 28, def: 45, dex: 25, hp: 65, lck: 28, mag: 20, res: 25, spd: 22, str: 42 },
  tier: 'Master',
};

const BOW_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 10, str: 10 },
  id: 'bow-knight',
  movement: 8,
  name: 'Bow Knight',
  statCaps: { cha: 35, def: 27, dex: 40, hp: 60, lck: 33, mag: 20, res: 23, spd: 37, str: 35 },
  tier: 'Master',
};

const DARK_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 15, str: 10 },
  id: 'dark-knight',
  movement: 8,
  name: 'Dark Knight',
  statCaps: { cha: 30, def: 30, dex: 28, hp: 58, lck: 28, mag: 38, res: 25, spd: 28, str: 33 },
  tier: 'Master',
};

const HOLY_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 10, res: 15 },
  id: 'holy-knight',
  movement: 8,
  name: 'Holy Knight',
  statCaps: { cha: 33, def: 28, dex: 28, hp: 58, lck: 33, mag: 37, res: 35, spd: 28, str: 30 },
  tier: 'Master',
};

const WAR_MASTER: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { dex: 10, str: 25 },
  id: 'war-master',
  movement: 5,
  name: 'War Master',
  statCaps: { cha: 28, def: 28, dex: 35, hp: 70, lck: 28, mag: 18, res: 18, spd: 35, str: 50 },
  tier: 'Master',
};

const GREMORY: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 20, res: 10 },
  id: 'gremory',
  movement: 5,
  name: 'Gremory',
  statCaps: { cha: 35, def: 20, dex: 28, hp: 50, lck: 35, mag: 45, res: 38, spd: 25, str: 18 },
  tier: 'Master',
};

// ─── UNIQUE ───────────────────────────────────────────────────────────────────

const DANCER: ClassData = {
  eligibility: {},
  growthModifiers: { cha: 10, lck: 10, spd: 10 },
  id: 'dancer',
  movement: 5,
  name: 'Dancer',
  statCaps: { cha: 40, def: 22, dex: 28, hp: 50, lck: 35, mag: 24, res: 24, spd: 35, str: 24 },
  tier: 'Special',
};

// ─── HOUSE LORD UNIQUE ────────────────────────────────────────────────────────

const ARMORED_LORD: ClassData = {
  eligibility: { uniqueTo: ['edelgard'] },
  growthModifiers: { def: 20, str: 15 },
  id: 'armored-lord',
  movement: 4,
  name: 'Armored Lord',
  statCaps: { cha: 38, def: 40, dex: 25, hp: 65, lck: 30, mag: 22, res: 22, spd: 22, str: 45 },
  tier: 'Unique',
};

const EMPEROR: ClassData = {
  eligibility: { uniqueTo: ['edelgard'] },
  growthModifiers: { def: 25, str: 20 },
  id: 'emperor',
  movement: 5,
  name: 'Emperor',
  statCaps: { cha: 40, def: 48, dex: 28, hp: 75, lck: 32, mag: 22, res: 22, spd: 25, str: 55 },
  tier: 'Unique',
};

const HIGH_LORD: ClassData = {
  eligibility: { uniqueTo: ['dimitri'] },
  growthModifiers: { dex: 10, spd: 10, str: 15 },
  id: 'high-lord',
  movement: 5,
  name: 'High Lord',
  statCaps: { cha: 40, def: 26, dex: 32, hp: 60, lck: 35, mag: 22, res: 22, spd: 32, str: 45 },
  tier: 'Unique',
};

const GREAT_LORD: ClassData = {
  eligibility: { uniqueTo: ['dimitri'] },
  growthModifiers: { dex: 15, spd: 15, str: 20 },
  id: 'great-lord',
  movement: 6,
  name: 'Great Lord',
  statCaps: { cha: 42, def: 28, dex: 40, hp: 70, lck: 38, mag: 22, res: 22, spd: 42, str: 55 },
  tier: 'Unique',
};

const WYVERN_MASTER: ClassData = {
  eligibility: { uniqueTo: ['claude'] },
  growthModifiers: { def: 10, dex: 10, str: 15 },
  id: 'wyvern-master',
  movement: 7,
  name: 'Wyvern Master',
  statCaps: { cha: 40, def: 33, dex: 35, hp: 60, lck: 35, mag: 18, res: 18, spd: 30, str: 42 },
  tier: 'Unique',
};

const BARBAROSSA: ClassData = {
  eligibility: { uniqueTo: ['claude'] },
  growthModifiers: { def: 10, dex: 15, str: 20 },
  id: 'barbarossa',
  movement: 8,
  name: 'Barbarossa',
  statCaps: { cha: 42, def: 36, dex: 42, hp: 68, lck: 38, mag: 18, res: 18, spd: 33, str: 50 },
  tier: 'Unique',
};

const ENLIGHTENED_ONE: ClassData = {
  eligibility: { uniqueTo: ['byleth_m', 'byleth_f'] },
  growthModifiers: { dex: 10, mag: 10, str: 10 },
  id: 'enlightened-one',
  movement: 5,
  name: 'Enlightened One',
  statCaps: { cha: 45, def: 30, dex: 38, hp: 70, lck: 40, mag: 35, res: 30, spd: 35, str: 42 },
  tier: 'Unique',
};

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

export const CLASSES: ClassData[] = [
  // Beginner
  COMMONER, NOBLE, MYRMIDON, SOLDIER, FIGHTER, MONK,
  // Intermediate
  LORD, MERCENARY, THIEF, CAVALIER, ARMOR_KNIGHT, BRIGAND,
  ARCHER, BRAWLER, MAGE, DARK_MAGE, PRIEST,
  // Advanced
  HERO, SWORDMASTER, ASSASSIN, FORTRESS_KNIGHT, PALADIN,
  WYVERN_RIDER, WARRIOR, SNIPER, GRAPPLER, WARLOCK, BISHOP,
  DARK_BISHOP, VALKYRIE, PEGASUS_KNIGHT,
  // Master
  FALCON_KNIGHT, WYVERN_LORD, MORTAL_SAVANT, GREAT_KNIGHT,
  BOW_KNIGHT, DARK_KNIGHT, HOLY_KNIGHT, WAR_MASTER, GREMORY,
  // Special
  DANCER,
  // Unique
  ARMORED_LORD, EMPEROR, HIGH_LORD, GREAT_LORD,
  WYVERN_MASTER, BARBAROSSA, ENLIGHTENED_ONE,
];

export const CLASSES_BY_ID: Record<string, ClassData> = Object.fromEntries(
  CLASSES.map((c) => [c.id, c]),
);
