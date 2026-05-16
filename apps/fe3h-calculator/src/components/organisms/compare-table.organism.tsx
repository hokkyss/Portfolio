import Badge from '@portfolio/design-system/badge';
import cn from '@portfolio/design-system/cn';
import TableBody from '@portfolio/design-system/table-body';
import TableCell from '@portfolio/design-system/table-cell';
import TableHead from '@portfolio/design-system/table-head';
import TableHeader from '@portfolio/design-system/table-header';
import TableRow from '@portfolio/design-system/table-row';
import tw from '@portfolio/design-system/tw';
import type { Ability } from '../../lib/abilities/models/ability.model';
import type { Character } from '../../lib/characters/models/character.model';
import type { ClassData } from '../../lib/classes/models/class.model';
import { calculateEffectiveGrowths, STAT_KEYS, type StatKey } from '../../lib/growths/utils/growths.utils';
import { growthColor, STAT_LABELS, tierBadgeVariant } from './growths-and-stats.helpers';

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
export function CompareTable({
  character,
  classes,
  onSortKey,
  personalAbility,
  selectedClassId,
  sortKey,
}: {
  character: Character;
  classes: ClassData[];
  onSortKey: (k: 'tier' | StatKey) => void;
  personalAbility: Ability | null;
  selectedClassId: string;
  sortKey: 'tier' | StatKey;
}) {
  return (
    <div className={tw`relative flex-1 min-h-0 overflow-auto rounded-xl border border-border bg-card shadow-sm`}>
      <table className={tw`w-full text-sm caption-bottom`}>
        <TableHeader className={tw`sticky top-0 z-20 bg-card shadow-sm`}>
          <TableRow className={tw`border-none bg-muted/40 hover:bg-muted/40`}>
            <TableHead className={tw`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground`}>
              Class
            </TableHead>
            <TableHead
              className={cn(
                tw`px-2 py-3 text-center text-xs font-semibold uppercase tracking-wide cursor-pointer select-none transition-colors hover:text-foreground`,
                sortKey === 'tier' ? tw`text-primary` : tw`text-muted-foreground`,
              )}
              onClick={() => onSortKey('tier')}
            >
              Tier
              {sortKey === 'tier' && <span className={tw`ml-1`}>↓</span>}
            </TableHead>
            {STAT_KEYS.map((key) => (
              <TableHead
                className={cn(
                  tw`px-2 py-3 text-xs font-semibold uppercase tracking-wide cursor-pointer select-none transition-colors hover:text-foreground`,
                  sortKey === key ? tw`text-primary` : tw`text-muted-foreground`,
                )}
                key={key}
                onClick={() => onSortKey(key)}
              >
                <div className={tw`flex items-center justify-end gap-0.5`}>
                  <span>
                    {STAT_LABELS[key]}
                    {sortKey === key && <span className={tw`ml-1`}>↓</span>}
                  </span>
                  <span className={tw`w-7`} />
                </div>
              </TableHead>
            ))}
          </TableRow>
          {/* Base Character Growths Row */}
          <TableRow className={tw`border-b-2 border-border/80 bg-muted/10`}>
            <TableHead className={tw`px-4 py-2.5 font-semibold whitespace-nowrap text-foreground`}>
              {character.name}
              {' '}
              <span className={tw`font-normal text-muted-foreground`}>(Base)</span>
            </TableHead>
            <TableHead className={tw`px-2 py-2.5 text-center text-muted-foreground`}>
              —
            </TableHead>
            {STAT_KEYS.map((key) => (
              <TableHead
                className={tw`px-2 py-2.5`}
                key={`base-${key}`}
              >
                <div className={tw`flex items-center justify-end gap-0.5 whitespace-nowrap tabular-nums`}>
                  <span className={cn(tw`font-semibold`, growthColor(character.growthRates[key]))}>
                    {character.growthRates[key]}
                    %
                  </span>
                  <span className={tw`w-7`} />
                </div>
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
                {STAT_KEYS.map((key) => {
                  const delta = growths[key] - character.growthRates[key];
                  return (
                    <TableCell
                      className={tw`px-2 py-2.5`}
                      key={key}
                    >
                      <div className={tw`flex items-center justify-end gap-0.5 whitespace-nowrap tabular-nums`}>
                        <span className={cn(tw`font-medium`, growthColor(growths[key]))}>
                          {growths[key]}
                          %
                        </span>
                        <span
                          className={cn(
                            tw`w-7 text-right text-[10px]`,
                            delta > 0 ? tw`text-green-600 dark:text-green-500` : delta < 0 ? tw`text-red-600 dark:text-red-500` : tw`text-transparent`,
                          )}
                        >
                          {delta > 0 ? '+' : ''}
                          {delta}
                        </span>
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </table>
    </div>
  );
}
