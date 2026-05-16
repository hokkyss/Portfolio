import tw from '@portfolio/design-system/tw';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/growths-and-stats')({
  component: GrowthsAndStatsComponent,
});

/**
 *
 */
function GrowthsAndStatsComponent() {
  return (
    <div className={tw`flex flex-col gap-4`}>
      <h2 className={tw`text-2xl font-semibold`}>Growth & Max Stats Calculator</h2>
      <p>Select a character and class to view stat projections.</p>
      {/* TODO: Add character/class selectors and stat tables */}
    </div>
  );
}
