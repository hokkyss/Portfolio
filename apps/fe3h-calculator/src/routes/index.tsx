import tw from '@portfolio/design-system/tw';
import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: IndexComponent,
});

/**
 *
 */
function IndexComponent() {
  return (
    <div className={tw`flex flex-col gap-4 max-w-2xl`}>
      <h2 className={tw`text-2xl font-semibold`}>Welcome to the Fire Emblem: Three Houses Calculator</h2>
      <p>Select a tool below to get started:</p>
      <div className={tw`grid grid-cols-1 md:grid-cols-2 gap-4`}>
        <Link
          className={tw`block p-6 border rounded-xl hover:bg-muted transition-colors`}
          to="/growths-and-stats"
        >
          <h3 className={tw`font-bold mb-2`}>Growth & Max Stats</h3>
          <p className={tw`text-sm text-muted-foreground`}>Calculate projected stats across levels and view class caps.</p>
        </Link>
        <Link
          className={tw`block p-6 border rounded-xl hover:bg-muted transition-colors`}
          to="/damage"
        >
          <h3 className={tw`font-bold mb-2`}>Damage Calculator</h3>
          <p className={tw`text-sm text-muted-foreground`}>Compute battle stats including Hit, Crit, and Doubling thresholds.</p>
        </Link>
      </div>
    </div>
  );
}
