import tw from '@portfolio/design-system/tw';
import type { StatKey } from '../../lib/game/utils/growths.utils';

export const STAT_LABELS: Record<StatKey, string> = {
  cha: 'Cha', def: 'Def', dex: 'Dex', hp: 'HP',
  lck: 'Lck', mag: 'Mag', res: 'Res', spd: 'Spd', str: 'Str',
};

/**
 *
 * @param rate
 */
export function growthColor(rate: number): string {
  if (rate >= 60) return tw`text-emerald-500 font-bold`;
  if (rate >= 45) return tw`text-yellow-500 font-semibold`;
  return tw`text-muted-foreground`;
}

/**
 *
 * @param tier
 */
export function tierBadgeVariant(tier: string): 'default' | 'destructive' | 'outline' | 'secondary' {
  if (tier === 'Master') return 'default';
  if (tier === 'Advanced') return 'secondary';
  return 'outline';
}
