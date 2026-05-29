import type { ClassData } from '../models/class.model';

// Stat caps and growth modifiers sourced from:
// https://serenesforest.net/three-houses/classes/

// ─── BEGINNER ────────────────────────────────────────────────────────────────

const COMMONER = {
  eligibility: {},
  growthModifiers: {},
  id: 'commoner',
  movement: 4,
  name: 'Commoner',
  tier: 'Beginner',
} as const satisfies ClassData;

const NOBLE = {
  eligibility: {},
  growthModifiers: { cha: 5 },
  id: 'noble',
  movement: 4,
  name: 'Noble',
  tier: 'Beginner',
} as const satisfies ClassData;

const MYRMIDON = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 10, res: -5, spd: 5 },
  id: 'myrmidon',
  movement: 4,
  name: 'Myrmidon',
  tier: 'Beginner',
} as const satisfies ClassData;

const SOLDIER = {
  eligibility: {},
  growthModifiers: { cha: 5, dex: 5, hp: 10, res: -5 },
  id: 'soldier',
  movement: 4,
  name: 'Soldier',
  tier: 'Beginner',
} as const satisfies ClassData;

const FIGHTER = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 10, res: -5, str: 5 },
  id: 'fighter',
  movement: 4,
  name: 'Fighter',
  tier: 'Beginner',
} as const satisfies ClassData;

const MONK = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 5, res: 5 },
  id: 'monk',
  movement: 4,
  name: 'Monk',
  tier: 'Beginner',
} as const satisfies ClassData;

// ─── INTERMEDIATE ─────────────────────────────────────────────────────────────

const LORD = {
  eligibility: { uniqueTo: ['edelgard', 'dimitri', 'claude'] },
  growthModifiers: { cha: 10, dex: 10, hp: 20 },
  id: 'lord',
  movement: 5,
  name: 'Lord',
  tier: 'Intermediate',
} as const satisfies ClassData;

const MERCENARY = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 20, res: -5, spd: 5, str: 5 },
  id: 'mercenary',
  movement: 5,
  name: 'Mercenary',
  tier: 'Intermediate',
} as const satisfies ClassData;

const THIEF = {
  eligibility: {},
  growthModifiers: { cha: 5, dex: 10, hp: 20, spd: 10 },
  id: 'thief',
  movement: 5,
  name: 'Thief',
  tier: 'Intermediate',
} as const satisfies ClassData;

const CAVALIER = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 5, dex: 5, hp: 20, spd: -10, str: 5 },
  id: 'cavalier',
  movement: 7,
  name: 'Cavalier',
  tier: 'Intermediate',
} as const satisfies ClassData;

const ARMOR_KNIGHT = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 10, hp: 20, res: -5, spd: -10 },
  id: 'armor-knight',
  movement: 4,
  name: 'Armor Knight',
  tier: 'Intermediate',
} as const satisfies ClassData;

const BRIGAND = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 30, res: -5, str: 10 },
  id: 'brigand',
  movement: 5,
  name: 'Brigand',
  tier: 'Intermediate',
} as const satisfies ClassData;

const ARCHER = {
  eligibility: {},
  growthModifiers: { cha: 5, dex: 10, hp: 5, lck: 5 },
  id: 'archer',
  movement: 4,
  name: 'Archer',
  tier: 'Intermediate',
} as const satisfies ClassData;

const BRAWLER = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { cha: 5, dex: 10, hp: 30, mag: -10, res: -10, spd: 10 },
  id: 'brawler',
  movement: 5,
  name: 'Brawler',
  tier: 'Intermediate',
} as const satisfies ClassData;

const MAGE = {
  eligibility: {},
  growthModifiers: { cha: 5, def: -5, dex: 5, hp: 5, mag: 10, res: 5, str: -5 },
  id: 'mage',
  movement: 4,
  name: 'Mage',
  tier: 'Intermediate',
} as const satisfies ClassData;

const DARK_MAGE = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { def: -5, dex: 5, hp: 5, mag: 10, res: 5, str: -5 },
  id: 'dark-mage',
  movement: 4,
  name: 'Dark Mage',
  tier: 'Intermediate',
} as const satisfies ClassData;

const PRIEST = {
  eligibility: {},
  growthModifiers: { cha: 10, def: -5, dex: 5, hp: 5, mag: 5, res: 10, str: -5 },
  id: 'priest',
  movement: 4,
  name: 'Priest',
  tier: 'Intermediate',
} as const satisfies ClassData;

// ─── ADVANCED ─────────────────────────────────────────────────────────────────

const HERO = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { cha: 5, hp: 30, res: -5, spd: 10, str: 10 },
  id: 'hero',
  movement: 5,
  name: 'Hero',
  tier: 'Advanced',
} as const satisfies ClassData;

const SWORDMASTER = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 25, res: -5, spd: 20, str: 10 },
  id: 'swordmaster',
  movement: 6,
  name: 'Swordmaster',
  tier: 'Advanced',
} as const satisfies ClassData;

const ASSASSIN = {
  eligibility: {},
  growthModifiers: { dex: 20, hp: 20, spd: 20 },
  id: 'assassin',
  movement: 6,
  name: 'Assassin',
  tier: 'Advanced',
} as const satisfies ClassData;

const FORTRESS_KNIGHT = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 15, hp: 30, spd: -10, str: 10 },
  id: 'fortress-knight',
  movement: 4,
  name: 'Fortress Knight',
  tier: 'Advanced',
} as const satisfies ClassData;

const PALADIN = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 5, dex: 5, hp: 30, lck: 5, res: 5, spd: -10, str: 10 },
  id: 'paladin',
  movement: 8,
  name: 'Paladin',
  tier: 'Advanced',
} as const satisfies ClassData;

const WYVERN_RIDER = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 5, hp: 30, mag: -5, res: -5, str: 10 },
  id: 'wyvern-rider',
  movement: 7,
  name: 'Wyvern Rider',
  tier: 'Advanced',
} as const satisfies ClassData;

const WARRIOR = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 40, mag: -5, str: 15 },
  id: 'warrior',
  movement: 5,
  name: 'Warrior',
  tier: 'Advanced',
} as const satisfies ClassData;

const SNIPER = {
  eligibility: {},
  growthModifiers: { cha: 5, dex: 20, hp: 10, lck: 10, str: 5 },
  id: 'sniper',
  movement: 5,
  name: 'Sniper',
  tier: 'Advanced',
} as const satisfies ClassData;

const GRAPPLER = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { cha: 5, dex: 10, hp: 40, spd: 10, str: 10 },
  id: 'grappler',
  movement: 5,
  name: 'Grappler',
  tier: 'Advanced',
} as const satisfies ClassData;

const WARLOCK = {
  eligibility: {},
  growthModifiers: { cha: 5, def: -5, hp: 10, mag: 10, res: 5 },
  id: 'warlock',
  movement: 4,
  name: 'Warlock',
  tier: 'Advanced',
} as const satisfies ClassData;

const BISHOP = {
  eligibility: {},
  growthModifiers: { cha: 10, def: -5, hp: 10, lck: 10, mag: 10, res: 5 },
  id: 'bishop',
  movement: 4,
  name: 'Bishop',
  tier: 'Advanced',
} as const satisfies ClassData;

const DARK_BISHOP = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { def: -5, hp: 10, mag: 10, res: 5 },
  id: 'dark-bishop',
  movement: 4,
  name: 'Dark Bishop',
  tier: 'Advanced',
} as const satisfies ClassData;

const VALKYRIE = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { cha: 10, def: 5, hp: 5, lck: 5, mag: 5, res: 10, spd: -5 },
  id: 'valkyrie',
  movement: 8,
  name: 'Valkyrie',
  tier: 'Advanced',
} as const satisfies ClassData;

const PEGASUS_KNIGHT = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { cha: 10, hp: 15, res: 5, spd: 10 },
  id: 'pegasus-knight',
  movement: 7,
  name: 'Pegasus Knight',
  tier: 'Advanced',
} as const satisfies ClassData;

// ─── MASTER ───────────────────────────────────────────────────────────────────

const FALCON_KNIGHT = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { cha: 10, hp: 30, res: 5, spd: 20, str: 10 },
  id: 'falcon-knight',
  movement: 8,
  name: 'Falcon Knight',
  tier: 'Master',
} as const satisfies ClassData;

const WYVERN_LORD = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 5, hp: 30, mag: -5, spd: 10, str: 15 },
  id: 'wyvern-lord',
  movement: 8,
  name: 'Wyvern Lord',
  tier: 'Master',
} as const satisfies ClassData;

const MORTAL_SAVANT = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 20, lck: 10, mag: 10, spd: -10, str: 10 },
  id: 'mortal-savant',
  movement: 6,
  name: 'Mortal Savant',
  tier: 'Master',
} as const satisfies ClassData;

const GREAT_KNIGHT = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 5, hp: 30, res: -5, spd: -10, str: 10 },
  id: 'great-knight',
  movement: 6,
  name: 'Great Knight',
  tier: 'Master',
} as const satisfies ClassData;

const BOW_KNIGHT = {
  eligibility: {},
  growthModifiers: { cha: 5, hp: 10, spd: -5 },
  id: 'bow-knight',
  movement: 8,
  name: 'Bow Knight',
  tier: 'Master',
} as const satisfies ClassData;

const DARK_KNIGHT = {
  eligibility: {},
  growthModifiers: { cha: 5, def: 5, hp: 10, mag: 10, res: 10, spd: -5, str: 5 },
  id: 'dark-knight',
  movement: 8,
  name: 'Dark Knight',
  tier: 'Master',
} as const satisfies ClassData;

const HOLY_KNIGHT = {
  eligibility: {},
  growthModifiers: { cha: 10, def: 5, hp: 10, lck: 10, mag: 10, res: 10, spd: -5 },
  id: 'holy-knight',
  movement: 8,
  name: 'Holy Knight',
  tier: 'Master',
} as const satisfies ClassData;

const WAR_MASTER = {
  eligibility: { genderLock: 'male' },
  growthModifiers: { cha: 5, hp: 40, spd: 10, str: 15 },
  id: 'war-master',
  movement: 5,
  name: 'War Master',
  tier: 'Master',
} as const satisfies ClassData;

const GREMORY = {
  eligibility: { genderLock: 'female' },
  growthModifiers: { cha: 10, dex: 10, hp: 10, mag: 10, res: 5 },
  id: 'gremory',
  movement: 5,
  name: 'Gremory',
  tier: 'Master',
} as const satisfies ClassData;

// ─── UNIQUE ───────────────────────────────────────────────────────────────────

const DANCER = {
  eligibility: {},
  growthModifiers: { cha: 10, def: -5, hp: 20, res: -5, str: -5 },
  id: 'dancer',
  movement: 5,
  name: 'Dancer',
  tier: 'Special',
} as const satisfies ClassData;

// ─── HOUSE LORD UNIQUE ────────────────────────────────────────────────────────

const ARMORED_LORD = {
  eligibility: { uniqueTo: ['edelgard'] },
  growthModifiers: { cha: 10, def: 5, hp: 20, mag: 5, res: 5, str: 5 },
  id: 'armored-lord',
  movement: 4,
  name: 'Armored Lord',
  tier: 'Unique',
} as const satisfies ClassData;

const EMPEROR = {
  eligibility: { uniqueTo: ['edelgard'] },
  growthModifiers: { cha: 10, def: 5, hp: 30, mag: 10, res: 5, str: 10 },
  id: 'emperor',
  movement: 5,
  name: 'Emperor',
  tier: 'Unique',
} as const satisfies ClassData;

const HIGH_LORD = {
  eligibility: { uniqueTo: ['dimitri'] },
  growthModifiers: { cha: 10, def: 5, dex: 5, hp: 20, str: 5 },
  id: 'high-lord',
  movement: 5,
  name: 'High Lord',
  tier: 'Unique',
} as const satisfies ClassData;

const GREAT_LORD = {
  eligibility: { uniqueTo: ['dimitri'] },
  growthModifiers: { cha: 10, def: 5, dex: 10, hp: 30, str: 10 },
  id: 'great-lord',
  movement: 6,
  name: 'Great Lord',
  tier: 'Unique',
} as const satisfies ClassData;

const WYVERN_MASTER = {
  eligibility: { uniqueTo: ['claude'] },
  growthModifiers: { cha: 10, def: 5, hp: 20, spd: 5, str: 10 },
  id: 'wyvern-master',
  movement: 7,
  name: 'Wyvern Master',
  tier: 'Unique',
} as const satisfies ClassData;

const BARBAROSSA = {
  eligibility: { uniqueTo: ['claude'] },
  growthModifiers: { cha: 10, def: 5, hp: 30, spd: 10, str: 15 },
  id: 'barbarossa',
  movement: 8,
  name: 'Barbarossa',
  tier: 'Unique',
} as const satisfies ClassData;

const ENLIGHTENED_ONE = {
  eligibility: { uniqueTo: ['byleth_m', 'byleth_f'] },
  growthModifiers: { cha: 5, def: 5, hp: 20, mag: 10, str: 10 },
  id: 'enlightened-one',
  movement: 5,
  name: 'Enlightened One',
  tier: 'Unique',
} as const satisfies ClassData;

// ─── EXPORTS ──────────────────────────────────────────────────────────────────

export const CLASSES = [
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
] satisfies ClassData[];

export type ClassId = typeof CLASSES[number]['id'];

export const CLASSES_BY_ID = Object.fromEntries(
  CLASSES.map((c) => [c.id, c]),
) as Record<ClassId, ClassData>;
