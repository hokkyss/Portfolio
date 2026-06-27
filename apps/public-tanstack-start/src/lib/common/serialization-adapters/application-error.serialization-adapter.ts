import ApplicationError from '@portfolio/common/errors/application-error';
import type { Primitive } from '@portfolio/common/types';
import { createSerializationAdapter } from '@tanstack/react-router';

const applicationErrorSerializationAdapter = createSerializationAdapter({
  key: 'ApplicationError',
  test: (value) => value instanceof ApplicationError,
  toSerializable: (value) => ({
    message: value.message,
    payload: JSON.stringify(value.payload),
    status: value.status,
  }),
  fromSerializable: (value) => {
    const payload = JSON.parse(value.payload) as Record<string, Primitive>;

    const applicationError = new ApplicationError(value.status, value.message);

    Object.entries(payload).forEach(([key, value]) => {
      applicationError.addPayload(key, value);
    });

    return applicationError;
  },
});

export default applicationErrorSerializationAdapter;
