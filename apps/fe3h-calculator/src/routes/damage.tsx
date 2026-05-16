import tw from '@portfolio/design-system/tw';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/damage')({
  component: DamageCalculatorComponent,
});

/**
 *
 */
function DamageCalculatorComponent() {
  return (
    <div className={tw`flex flex-col gap-4`}>
      <h2 className={tw`text-2xl font-semibold`}>Damage Calculator</h2>
      <p>Configure attacker and defender to calculate battle outcomes.</p>
      {/* TODO: Add complex combat math UI */}
    </div>
  );
}
