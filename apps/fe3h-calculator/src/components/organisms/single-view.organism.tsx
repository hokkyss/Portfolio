import Badge from '@portfolio/design-system/badge';
import cn from '@portfolio/design-system/cn';
import Table from '@portfolio/design-system/table';
import TableBody from '@portfolio/design-system/table-body';
import TableCell from '@portfolio/design-system/table-cell';
import TableHead from '@portfolio/design-system/table-head';
import TableHeader from '@portfolio/design-system/table-header';
import TableRow from '@portfolio/design-system/table-row';
import tw from '@portfolio/design-system/tw';
import type { Stats } from '../../lib/common/models/stats.model';
import type { Ability } from '../../lib/game/models/ability.model';
import type { Character } from '../../lib/game/models/character.model';
import type { ClassData } from '../../lib/game/models/class.model';
import { STAT_KEYS } from '../../lib/game/utils/growths.utils';
import { growthColor, STAT_LABELS, tierBadgeVariant } from './growths-and-stats.helpers';

/**
 *
 * @param root0
 * @param root0.character
 * @param root0.cls
 * @param root0.effectiveGrowths
 * @param root0.personalAbility
 */
export function SingleView({
  character,
  cls,
  effectiveGrowths,
  personalAbility,
}: {
  character: Character;
  cls: ClassData;
  effectiveGrowths: Stats;
  personalAbility: Ability | null;
}) {
  return (
    <div className={tw`grid gap-6 lg:grid-cols-2 flex-1 min-h-0 overflow-auto pb-6`}>
      {/* Growth Rates */}
      <div className={tw`rounded-xl border border-border bg-card p-6 shadow-sm h-fit`}>
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
      <div className={tw`rounded-xl border border-border bg-card p-6 shadow-sm h-fit`}>
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
              <TableHead className={tw`pb-2 text-right`}>Maximum</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {STAT_KEYS.map((key) => {
              const charMax = character.maxStats[key];
              return (
                <TableRow className={tw`border-b border-border/50 last:border-0`} key={key}>
                  <TableCell className={tw`py-2 font-medium`}>{STAT_LABELS[key]}</TableCell>
                  <TableCell className={tw`py-2 text-right font-semibold`}>{charMax}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
