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
  tier: 'Beginner',
};

const NOBLE: ClassData = {
  eligibility: {},
  growthModifiers: {},
  id: 'noble',
  movement: 4,
  name: 'Noble',
  tier: 'Beginner',
};

const MYRMIDON: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 10 },
  id: 'myrmidon',
  movement: 4,
  name: 'Myrmidon',
  tier: 'Beginner',
};

const SOLDIER: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, str: 10 },
  id: 'soldier',
  movement: 4,
  name: 'Soldier',
  tier: 'Beginner',
};

const FIGHTER: ClassData = {
  eligibility: {},
  growthModifiers: { hp: 10, str: 10 },
  id: 'fighter',
  movement: 4,
  name: 'Fighter',
  tier: 'Beginner',
};

const MONK: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 10, res: 10 },
  id: 'monk',
  movement: 4,
  name: 'Monk',
  tier: 'Beginner',
};

// ─── INTERMEDIATE ─────────────────────────────────────────────────────────────

const LORD: ClassData = {
  eligibility: { uniqueTo: ['edelgard', 'dimitri', 'claude'] },
  growthModifiers: { dex: 10, str: 10 },
  id: 'lord',
  movement: 5,
  name: 'Lord',
  tier: 'Intermediate',
};

const MERCENARY: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 10 },
  id: 'mercenary',
  movement: 5,
  name: 'Mercenary',
  tier: 'Intermediate',
};

const THIEF: ClassData = {
  eligibility: {},
  growthModifiers: { lck: 10, spd: 10 },
  id: 'thief',
  movement: 5,
  name: 'Thief',
  tier: 'Intermediate',
};

const CAVALIER: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, str: 10 },
  id: 'cavalier',
  movement: 7,
  name: 'Cavalier',
  tier: 'Intermediate',
};

const ARMOR_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { def: 20, str: 10 },
  id: 'armor-knight',
  movement: 4,
  name: 'Armor Knight',
  tier: 'Intermediate',
};

const BRIGAND: ClassData = {
  eligibility: {},
  growthModifiers: { hp: 10, str: 20 },
  id: 'brigand',
  movement: 5,
  name: 'Brigand',
  tier: 'Intermediate',
};

const ARCHER: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 15, spd: 5 },
  id: 'archer',
  movement: 4,
  name: 'Archer',
  tier: 'Intermediate',
};

const BRAWLER: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { spd: 10, str: 15 },
  id: 'brawler',
  movement: 5,
  name: 'Brawler',
  tier: 'Intermediate',
};

const MAGE: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 20, res: 10 },
  id: 'mage',
  movement: 4,
  name: 'Mage',
  tier: 'Intermediate',
};

const DARK_MAGE: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { hp: 10, mag: 20 },
  id: 'dark-mage',
  movement: 4,
  name: 'Dark Mage',
  tier: 'Intermediate',
};

const PRIEST: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 10, res: 20 },
  id: 'priest',
  movement: 4,
  name: 'Priest',
  tier: 'Intermediate',
};

// ─── ADVANCED ─────────────────────────────────────────────────────────────────

const HERO: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { dex: 10, spd: 10, str: 10 },
  id: 'hero',
  movement: 5,
  name: 'Hero',
  tier: 'Advanced',
};

const SWORDMASTER: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 15 },
  id: 'swordmaster',
  movement: 6,
  name: 'Swordmaster',
  tier: 'Advanced',
};

const ASSASSIN: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, lck: 10, spd: 10 },
  id: 'assassin',
  movement: 6,
  name: 'Assassin',
  tier: 'Advanced',
};

const FORTRESS_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { def: 20, hp: 10, str: 10 },
  id: 'fortress-knight',
  movement: 4,
  name: 'Fortress Knight',
  tier: 'Advanced',
};

const PALADIN: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, dex: 10, str: 10 },
  id: 'paladin',
  movement: 8,
  name: 'Paladin',
  tier: 'Advanced',
};

const WYVERN_RIDER: ClassData = {
  eligibility: {},
  growthModifiers: { def: 10, str: 15 },
  id: 'wyvern-rider',
  movement: 7,
  name: 'Wyvern Rider',
  tier: 'Advanced',
};

const WARRIOR: ClassData = {
  eligibility: {},
  growthModifiers: { hp: 20, str: 15 },
  id: 'warrior',
  movement: 5,
  name: 'Warrior',
  tier: 'Advanced',
};

const SNIPER: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 20, spd: 5 },
  id: 'sniper',
  movement: 5,
  name: 'Sniper',
  tier: 'Advanced',
};

const GRAPPLER: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { dex: 10, spd: 10, str: 20 },
  id: 'grappler',
  movement: 5,
  name: 'Grappler',
  tier: 'Advanced',
};

const WARLOCK: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, mag: 20 },
  id: 'warlock',
  movement: 4,
  name: 'Warlock',
  tier: 'Advanced',
};

const BISHOP: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 15, res: 15 },
  id: 'bishop',
  movement: 4,
  name: 'Bishop',
  tier: 'Advanced',
};

const DARK_BISHOP: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { hp: 10, mag: 20, res: 10 },
  id: 'dark-bishop',
  movement: 4,
  name: 'Dark Bishop',
  tier: 'Advanced',
};

const VALKYRIE: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 15, spd: 5 },
  id: 'valkyrie',
  movement: 8,
  name: 'Valkyrie',
  tier: 'Advanced',
};

const PEGASUS_KNIGHT: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 10, res: 10, spd: 10 },
  id: 'pegasus-knight',
  movement: 7,
  name: 'Pegasus Knight',
  tier: 'Advanced',
};

// ─── MASTER ───────────────────────────────────────────────────────────────────

const FALCON_KNIGHT: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 10, res: 10, spd: 15 },
  id: 'falcon-knight',
  movement: 8,
  name: 'Falcon Knight',
  tier: 'Master',
};

const WYVERN_LORD: ClassData = {
  eligibility: {},
  growthModifiers: { def: 15, str: 20 },
  id: 'wyvern-lord',
  movement: 8,
  name: 'Wyvern Lord',
  tier: 'Master',
};

const MORTAL_SAVANT: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, mag: 10, spd: 10 },
  id: 'mortal-savant',
  movement: 6,
  name: 'Mortal Savant',
  tier: 'Master',
};

const GREAT_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { def: 20, hp: 10, str: 10 },
  id: 'great-knight',
  movement: 6,
  name: 'Great Knight',
  tier: 'Master',
};

const BOW_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { dex: 10, spd: 10, str: 10 },
  id: 'bow-knight',
  movement: 8,
  name: 'Bow Knight',
  tier: 'Master',
};

const DARK_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 15, str: 10 },
  id: 'dark-knight',
  movement: 8,
  name: 'Dark Knight',
  tier: 'Master',
};

const HOLY_KNIGHT: ClassData = {
  eligibility: {},
  growthModifiers: { mag: 10, res: 15 },
  id: 'holy-knight',
  movement: 8,
  name: 'Holy Knight',
  tier: 'Master',
};

const WAR_MASTER: ClassData = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { dex: 10, str: 25 },
  id: 'war-master',
  movement: 5,
  name: 'War Master',
  tier: 'Master',
};

const GREMORY: ClassData = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { mag: 20, res: 10 },
  id: 'gremory',
  movement: 5,
  name: 'Gremory',
  tier: 'Master',
};

// ─── UNIQUE ───────────────────────────────────────────────────────────────────

const DANCER: ClassData = {
  eligibility: {},
  growthModifiers: { cha: 10, lck: 10, spd: 10 },
  id: 'dancer',
  movement: 5,
  name: 'Dancer',
  tier: 'Special',
};

// ─── HOUSE LORD UNIQUE ────────────────────────────────────────────────────────

const ARMORED_LORD: ClassData = {
  eligibility: { uniqueTo: ['edelgard'] },
  growthModifiers: { def: 20, str: 15 },
  id: 'armored-lord',
  movement: 4,
  name: 'Armored Lord',
  tier: 'Unique',
};

const EMPEROR: ClassData = {
  eligibility: { uniqueTo: ['edelgard'] },
  growthModifiers: { def: 25, str: 20 },
  id: 'emperor',
  movement: 5,
  name: 'Emperor',
  tier: 'Unique',
};

const HIGH_LORD: ClassData = {
  eligibility: { uniqueTo: ['dimitri'] },
  growthModifiers: { dex: 10, spd: 10, str: 15 },
  id: 'high-lord',
  movement: 5,
  name: 'High Lord',
  tier: 'Unique',
};

const GREAT_LORD: ClassData = {
  eligibility: { uniqueTo: ['dimitri'] },
  growthModifiers: { dex: 15, spd: 15, str: 20 },
  id: 'great-lord',
  movement: 6,
  name: 'Great Lord',
  tier: 'Unique',
};

const WYVERN_MASTER: ClassData = {
  eligibility: { uniqueTo: ['claude'] },
  growthModifiers: { def: 10, dex: 10, str: 15 },
  id: 'wyvern-master',
  movement: 7,
  name: 'Wyvern Master',
  tier: 'Unique',
};

const BARBAROSSA: ClassData = {
  eligibility: { uniqueTo: ['claude'] },
  growthModifiers: { def: 10, dex: 15, str: 20 },
  id: 'barbarossa',
  movement: 8,
  name: 'Barbarossa',
  tier: 'Unique',
};

const ENLIGHTENED_ONE: ClassData = {
  eligibility: { uniqueTo: ['byleth_m', 'byleth_f'] },
  growthModifiers: { dex: 10, mag: 10, str: 10 },
  id: 'enlightened-one',
  movement: 5,
  name: 'Enlightened One',
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
