import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import { createServerEntry } from '@tanstack/react-start/server-entry';

import './clients/sentry/sentry.client';

const startHandler = createStartHandler(defaultStreamHandler);

export default createServerEntry({
  fetch(request, opts) {
    return startHandler(request, opts);
  },
});
