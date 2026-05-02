import { StartClient } from '@tanstack/react-start/client';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

import './clients/firebase/firebase-analytics.client';

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <StartClient />
    </StrictMode>,
  );
});
