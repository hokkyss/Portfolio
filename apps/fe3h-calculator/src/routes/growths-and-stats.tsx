'use client';

import Badge from '@portfolio/design-system/badge';
import Button from '@portfolio/design-system/button';
import cn from '@portfolio/design-system/cn';
import Label from '@portfolio/design-system/label';
import Select from '@portfolio/design-system/select';
import SelectContent from '@portfolio/design-system/select-content';
import SelectGroup from '@portfolio/design-system/select-group';
import SelectItem from '@portfolio/design-system/select-item';
import SelectLabel from '@portfolio/design-system/select-label';
import SelectTrigger from '@portfolio/design-system/select-trigger';
import SelectValue from '@portfolio/design-system/select-value';
import Table from '@portfolio/design-system/table';
import TableBody from '@portfolio/design-system/table-body';
import TableCell from '@portfolio/design-system/table-cell';
import TableHead from '@portfolio/design-system/table-head';
import TableHeader from '@portfolio/design-system/table-header';
import TableRow from '@portfolio/design-system/table-row';
import tw from '@portfolio/design-system/tw';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import type { Ability } from '../lib/abilities/models/ability.model';
import type { Character } from '../lib/characters/models/character.model';
import type { ClassData } from '../lib/classes/models/class.model';
import type { Stats } from '../lib/common/models/stats.model';
import { ABILITIES } from '../lib/abilities/data/abilities.data';
import { CHARACTERS, CHARACTERS_BY_ID } from '../lib/characters/data/characters.data';
import { CLASSES, CLASSES_BY_ID } from '../lib/classes/data/classes.data';
import { getEligibleClasses } from '../lib/classes/utils/class-eligibility.utils';
import { calculateEffectiveGrowths, calculateEffectiveStatCaps, STAT_KEYS, type StatKey } from '../lib/growths/utils/growths.utils';

export const Route = createFileRoute('/growths-and-stats')({
  component: GrowthsAndStatsPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STAT_LABELS: Record<StatKey, string> = {
  cha: 'Cha', def: 'Def', dex: 'Dex', hp: 'HP',
  lck: 'Lck', mag: 'Mag', res: 'Res', spd: 'Spd', str: 'Str',
};

const TIER_ORDER = ['Beginner', 'Intermediate', 'Advanced', 'Master', 'Special', 'Unique'];

const FACTION_ORDER = ['Black Eagles', 'Blue Lions', 'Golden Deer', 'Church of Seiros', 'Ashen Wolves', 'Other'];

/**
 *
 * @param root0
 * @param root0.character
 * @param root0.classes
 * @param root0.onSortKey
 * @param root0.personalAbility
 * @param root0.selectedClassId
 * @param root0.sortKey
 */
function CompareTable({
  character,
  classes,
  onSortKey,
  personalAbility,
  selectedClassId,
  sortKey,
}: {
  character: Character;
  classes: ClassData[];
  onSortKey: (k: StatKey) => void;
  personalAbility: Ability | null;
  selectedClassId: string;
  sortKey: StatKey;
}) {
  return (
    <div className={tw`overflow-x-auto rounded-xl border border-border bg-card shadow-sm`}>
      <Table className={tw`w-full text-sm`}>
        <TableHeader>
          <TableRow className={tw`border-b border-border bg-muted/40 hover:bg-muted/40`}>
            <TableHead className={tw`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground`}>
              Class
            </TableHead>
            <TableHead className={tw`px-2 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground text-center`}>Tier</TableHead>
            {STAT_KEYS.map((key) => (
              <TableHead
                className={cn(
                  tw`px-2 py-3 text-right text-xs font-semibold uppercase tracking-wide cursor-pointer select-none transition-colors hover:text-foreground`,
                  sortKey === key ? tw`text-primary` : tw`text-muted-foreground`,
                )}
                key={key}
                onClick={() => onSortKey(key)}
              >
                {STAT_LABELS[key]}
                {sortKey === key && <span className={tw`ml-1`}>↓</span>}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.map((cls) => {
            const growths = calculateEffectiveGrowths(character, cls, personalAbility);
            const isSelected = cls.id === selectedClassId;
            return (
              <TableRow
                className={cn(
                  tw`border-b border-border/50 last:border-0 transition-colors`,
                  isSelected ? tw`bg-primary/8 hover:bg-primary/8` : tw`hover:bg-muted/30`,
                )}
                key={cls.id}
              >
                <TableCell className={tw`px-4 py-2.5 font-medium whitespace-nowrap`}>
                  {isSelected && <span className={tw`mr-1.5 text-primary`}>▶</span>}
                  {cls.name}
                </TableCell>
                <TableCell className={tw`px-2 py-2.5 text-center`}>
                  <Badge className={tw`text-xs`} variant={tierBadgeVariant(cls.tier)}>
                    {cls.tier}
                  </Badge>
                </TableCell>
                {STAT_KEYS.map((key) => (
                  <TableCell
                    className={cn(
                      tw`px-2 py-2.5 text-right tabular-nums`,
                      sortKey === key && growthColor(growths[key]),
                    )}
                    key={key}
                  >
                    {growths[key]}
                    %
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

/**
 *
 * @param rate
 */
function growthColor(rate: number): string {
  if (rate >= 60) return tw`text-emerald-500 font-bold`;
  if (rate >= 45) return tw`text-yellow-500 font-semibold`;
  return tw`text-muted-foreground`;
}

// ─── Main component ───────────────────────────────────────────────────────────

/**
 *
 */
function GrowthsAndStatsPage() {
  const [selectedCharId, setSelectedCharId] = useState<string>(CHARACTERS[0].id);
  const [selectedClassId, setSelectedClassId] = useState<string>('commoner');
  const [compareMode, setCompareMode] = useState(false);
  const [sortKey, setSortKey] = useState<StatKey>('spd');

  const character = CHARACTERS_BY_ID[selectedCharId];
  const personalAbility = character.personalAbilityId ? (ABILITIES[character.personalAbilityId] ?? null) : null;
  const eligibleClasses = useMemo(() => getEligibleClasses(character, CLASSES), [character]);
  const selectedClass = CLASSES_BY_ID[selectedClassId] ?? eligibleClasses[0];

  // Ensure selected class stays eligible when character changes
  const resolvedClass = eligibleClasses.find((c) => c.id === selectedClass.id) ?? eligibleClasses[0];

  const effectiveGrowths = calculateEffectiveGrowths(character, resolvedClass, personalAbility);
  const effectiveCaps = calculateEffectiveStatCaps(character, resolvedClass);

  // Grouped characters for select
  const charsByFaction = useMemo(() => {
    const map = new Map<string, Character[]>();
    for (const f of FACTION_ORDER) map.set(f, []);
    for (const c of CHARACTERS) {
      const list = map.get(c.faction) ?? [];
      list.push(c);
      map.set(c.faction, list);
    }
    return map;
  }, []);

  // Grouped eligible classes for select
  const classesByTier = useMemo(() => {
    const map = new Map<string, ClassData[]>();
    for (const t of TIER_ORDER) map.set(t, []);
    for (const c of eligibleClasses) {
      const list = map.get(c.tier) ?? [];
      list.push(c);
      map.set(c.tier, list);
    }
    return map;
  }, [eligibleClasses]);

  // Comparison table rows
  const sortedClasses = useMemo(() => {
    return [...eligibleClasses].sort((a, b) => {
      const ga = calculateEffectiveGrowths(character, a, personalAbility)[sortKey];
      const gb = calculateEffectiveGrowths(character, b, personalAbility)[sortKey];
      return gb - ga;
    });
  }, [eligibleClasses, character, personalAbility, sortKey]);

  return (
    <div className={tw`mx-auto max-w-6xl px-4 py-8 md:px-6`}>
      <div className={tw`mb-6`}>
        <h1 className={tw`text-3xl font-bold tracking-tight`}>Growths &amp; Stats</h1>
        <p className={tw`mt-1 text-sm text-muted-foreground`}>
          Select a character and class to view combined growth rates and effective stat caps.
        </p>
      </div>

      {/* ── Selectors ── */}
      <div className={tw`flex flex-col gap-4 sm:flex-row sm:items-end mb-8`}>
        {/* Character select */}
        <div className={tw`flex-1`}>
          <Label className={tw`block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1`} htmlFor="char-select">
            Character
          </Label>
          <Select
            items={CHARACTERS.map((c) => ({ label: c.name, value: c.id }))}
            onValueChange={(v) => {
              if (v) {
                setSelectedCharId(v);
                // reset class on char change
                setSelectedClassId('commoner');
              }
            }}
            value={selectedCharId}
          >
            <SelectTrigger className={tw`w-full bg-background`} id="char-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FACTION_ORDER.map((faction) => {
                const chars = charsByFaction.get(faction) ?? [];
                if (chars.length === 0) return null;
                return (
                  <SelectGroup key={faction}>
                    <SelectLabel>{faction}</SelectLabel>
                    {chars.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Class select */}
        <div className={tw`flex-1`}>
          <Label className={tw`block text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1`} htmlFor="class-select">
            Class
          </Label>
          <Select
            items={eligibleClasses.map((c) => ({ label: c.name, value: c.id }))}
            onValueChange={(v) => {
              if (v) setSelectedClassId(v);
            }}
            value={resolvedClass.id}
          >
            <SelectTrigger className={tw`w-full bg-background`} id="class-select">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TIER_ORDER.map((tier) => {
                const classes = classesByTier.get(tier) ?? [];
                if (classes.length === 0) return null;
                return (
                  <SelectGroup key={tier}>
                    <SelectLabel>{tier}</SelectLabel>
                    {classes.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Compare toggle */}
        <div>
          <Button
            className={tw`w-full sm:w-auto h-10`}
            onClick={() => setCompareMode((v) => !v)}
            type="button"
            variant={compareMode ? 'default' : 'outline'}
          >
            {compareMode ? 'Single View' : 'Compare All Classes'}
          </Button>
        </div>
      </div>

      {/* ── Personal ability notice ── */}
      {personalAbility && (
        <div className={tw`mb-6 flex items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-4 py-2 text-sm`}>
          <span className={tw`text-primary font-semibold`}>
            ✦
            {personalAbility.name}
          </span>
          <span className={tw`text-muted-foreground`}>
            —
            {personalAbility.description}
          </span>
        </div>
      )}

      {compareMode
        ? (
            <CompareTable
              character={character}
              classes={sortedClasses}
              onSortKey={setSortKey}
              personalAbility={personalAbility}
              selectedClassId={resolvedClass.id}
              sortKey={sortKey}
            />
          )
        : (
            <SingleView
              character={character}
              cls={resolvedClass}
              effectiveCaps={effectiveCaps}
              effectiveGrowths={effectiveGrowths}
              personalAbility={personalAbility}
            />
          )}
    </div>
  );
}

// ─── Single view ──────────────────────────────────────────────────────────────

/**
 *
 * @param root0
 * @param root0.character
 * @param root0.cls
 * @param root0.effectiveCaps
 * @param root0.effectiveGrowths
 * @param root0.personalAbility
 */
function SingleView({
  character,
  cls,
  effectiveCaps,
  effectiveGrowths,
  personalAbility,
}: {
  character: Character;
  cls: ClassData;
  effectiveCaps: Stats;
  effectiveGrowths: Stats;
  personalAbility: Ability | null;
}) {
  return (
    <div className={tw`grid gap-6 lg:grid-cols-2`}>
      {/* Growth Rates */}
      <div className={tw`rounded-xl border border-border bg-card p-6 shadow-sm`}>
        <div className={tw`mb-4 flex items-center justify-between`}>
          <h2 className={tw`text-lg font-semibold`}>Growth Rates</h2>
          <Badge className={tw`font-mono text-xs`} variant="outline">
            {cls.name}
          </Badge>
        </div>
        <Table className={tw`w-full text-sm`}>
          <TableHeader>
            <TableRow className={tw`text-xs uppercase text-muted-foreground border-b border-border hover:bg-transparent`}>
              <TableHead className={tw`pb-2 text-left`}>Stat</TableHead>
              <TableHead className={tw`pb-2 text-right`}>Base</TableHead>
              <TableHead className={tw`pb-2 text-right`}>Class</TableHead>
              {personalAbility && <TableHead className={tw`pb-2 text-right`}>Ability</TableHead>}
              <TableHead className={tw`pb-2 text-right`}>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STAT_KEYS.map((key) => {
              const base = character.growthRates[key];
              const classMod = cls.growthModifiers[key] ?? 0;
              const abilityMod = personalAbility?.modifiers.growths?.[key] ?? 0;
              const total = effectiveGrowths[key];
              return (
                <TableRow className={tw`border-b border-border/50 last:border-0`} key={key}>
                  <TableCell className={tw`py-2 font-medium`}>{STAT_LABELS[key]}</TableCell>
                  <TableCell className={tw`py-2 text-right text-muted-foreground`}>
                    {base}
                    %
                  </TableCell>
                  <TableCell className={tw`py-2 text-right`}>
                    {classMod !== 0
                      ? (
                          <span className={classMod > 0 ? tw`text-emerald-500` : tw`text-red-500`}>
                            {classMod > 0 ? '+' : ''}
                            {classMod}
                            %
                          </span>
                        )
                      : <span className={tw`text-muted-foreground`}>—</span>}
                  </TableCell>
                  {personalAbility && (
                    <TableCell className={tw`py-2 text-right`}>
                      {abilityMod !== 0
                        ? (
                            <span className={tw`text-primary`}>
                              +
                              {abilityMod}
                              %
                            </span>
                          )
                        : <span className={tw`text-muted-foreground`}>—</span>}
                    </TableCell>
                  )}
                  <TableCell className={cn(tw`py-2 text-right`, growthColor(total))}>
                    {total}
                    %
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Stat Caps */}
      <div className={tw`rounded-xl border border-border bg-card p-6 shadow-sm`}>
        <div className={tw`mb-4 flex items-center justify-between`}>
          <h2 className={tw`text-lg font-semibold`}>Stat Caps</h2>
          <Badge className={tw`text-xs`} variant={tierBadgeVariant(cls.tier)}>
            {cls.tier}
          </Badge>
        </div>
        <Table className={tw`w-full text-sm`}>
          <TableHeader>
            <TableRow className={tw`text-xs uppercase text-muted-foreground border-b border-border hover:bg-transparent`}>
              <TableHead className={tw`pb-2 text-left`}>Stat</TableHead>
              <TableHead className={tw`pb-2 text-right`}>Char Max</TableHead>
              <TableHead className={tw`pb-2 text-right`}>Class Cap</TableHead>
              <TableHead className={tw`pb-2 text-right`}>Effective</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STAT_KEYS.map((key) => {
              const charMax = character.maxStats[key];
              const classCap = cls.statCaps[key];
              const effective = effectiveCaps[key];
              const isClassLimiting = classCap < charMax;
              return (
                <TableRow className={tw`border-b border-border/50 last:border-0`} key={key}>
                  <TableCell className={tw`py-2 font-medium`}>{STAT_LABELS[key]}</TableCell>
                  <TableCell className={tw`py-2 text-right text-muted-foreground`}>{charMax}</TableCell>
                  <TableCell className={cn(tw`py-2 text-right`, isClassLimiting && tw`text-amber-500`)}>
                    {classCap}
                  </TableCell>
                  <TableCell className={tw`py-2 text-right font-semibold`}>{effective}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <p className={tw`mt-3 text-xs text-muted-foreground`}>
          <span className={tw`text-amber-500 font-semibold`}>Amber</span>
          {' '}
          = class cap is the limiting factor.
        </p>
      </div>
    </div>
  );
}

// ─── Compare table ────────────────────────────────────────────────────────────

/**
 *
 * @param tier
 */
function tierBadgeVariant(tier: string): 'default' | 'destructive' | 'outline' | 'secondary' {
  if (tier === 'Master' || tier === 'Unique') return 'default';
  if (tier === 'Advanced') return 'secondary';
  return 'outline';
}
