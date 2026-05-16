import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import { createServerEntry } from '@tanstack/react-start/server-entry';

const startHandler = createStartHandler(defaultStreamHandler);

export default createServerEntry({
  fetch(request, opts) {
    return startHandler(request, opts);
  },
});
