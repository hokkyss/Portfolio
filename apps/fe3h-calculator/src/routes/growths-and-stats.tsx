'use client';

import Button from '@portfolio/design-system/button';
import Label from '@portfolio/design-system/label';
import Select from '@portfolio/design-system/select';
import SelectContent from '@portfolio/design-system/select-content';
import SelectGroup from '@portfolio/design-system/select-group';
import SelectItem from '@portfolio/design-system/select-item';
import SelectLabel from '@portfolio/design-system/select-label';
import SelectTrigger from '@portfolio/design-system/select-trigger';
import SelectValue from '@portfolio/design-system/select-value';
import tw from '@portfolio/design-system/tw';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';
import type { Character } from '../lib/game/models/character.model';
import type { ClassData } from '../lib/game/models/class.model';
import { CompareTable } from '../components/organisms/compare-table.organism';
import { SingleView } from '../components/organisms/single-view.organism';
import { ABILITIES } from '../lib/game/data/abilities.data';
import { CHARACTERS, CHARACTERS_BY_ID } from '../lib/game/data/characters.data';
import { CLASSES, CLASSES_BY_ID, ClassId } from '../lib/game/data/classes.data';
import { getEligibleClasses } from '../lib/game/utils/class-eligibility.utils';
import { calculateEffectiveGrowths, type StatKey } from '../lib/game/utils/growths.utils';

export const Route = createFileRoute('/growths-and-stats')({
  component: GrowthsAndStatsPage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const TIER_ORDER = ['Beginner', 'Intermediate', 'Advanced', 'Master', 'Special', 'Unique'];
const FACTION_ORDER = ['Black Eagles', 'Blue Lions', 'Golden Deer', 'Church of Seiros', 'Ashen Wolves', 'Other'];

// ─── Main component ───────────────────────────────────────────────────────────

/**
 *
 */
function GrowthsAndStatsPage() {
  const [selectedCharId, setSelectedCharId] = useState<string>(CHARACTERS[0].id);
  const [selectedClassId, setSelectedClassId] = useState<string>('commoner');
  const [compareMode, setCompareMode] = useState(false);
  const [sortKey, setSortKey] = useState<'tier' | StatKey>('tier');

  const character = CHARACTERS_BY_ID[selectedCharId];
  const personalAbility = character.personalAbilityId ? (ABILITIES[character.personalAbilityId] ?? null) : null;
  const eligibleClasses = useMemo(() => getEligibleClasses(character, CLASSES), [character]);
  const selectedClass = CLASSES_BY_ID[selectedClassId as ClassId] ?? eligibleClasses[0];

  // Ensure selected class stays eligible when character changes
  const resolvedClass = eligibleClasses.find((c) => c.id === selectedClass.id) ?? eligibleClasses[0];

  const effectiveGrowths = calculateEffectiveGrowths(character, resolvedClass, personalAbility);

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
      if (sortKey === 'tier') {
        const TIER_WEIGHT: Record<string, number> = {
          Advanced: 3,
          Beginner: 0,
          Intermediate: 2,
          Master: 4,
          Special: 1,
          Unique: 1,
        };
        const wa = TIER_WEIGHT[a.tier] ?? 99;
        const wb = TIER_WEIGHT[b.tier] ?? 99;
        return wa - wb;
      }
      const ga = calculateEffectiveGrowths(character, a, personalAbility)[sortKey];
      const gb = calculateEffectiveGrowths(character, b, personalAbility)[sortKey];
      return gb - ga;
    });
  }, [eligibleClasses, character, personalAbility, sortKey]);

  return (
    <div className={tw`mx-auto flex h-[calc(100dvh-4rem)] max-w-6xl flex-col px-4 py-6 md:px-6`}>
      <div className={tw`mb-6 shrink-0`}>
        <h1 className={tw`text-3xl font-bold tracking-tight`}>Growths &amp; Stats</h1>
        <p className={tw`mt-1 text-sm text-muted-foreground`}>
          Select a character and class to view combined growth rates and effective stat caps.
        </p>
      </div>

      {/* ── Selectors ── */}
      <div className={tw`mb-8 flex shrink-0 flex-col gap-4 sm:flex-row sm:items-end`}>
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
            className={tw`w-full sm:w-44 h-10`}
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
        <div className={tw`mb-6 flex shrink-0 items-center gap-2 rounded-md border border-primary/40 bg-primary/5 px-4 py-2 text-sm`}>
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
              effectiveGrowths={effectiveGrowths}
              personalAbility={personalAbility}
            />
          )}
    </div>
  );
}
