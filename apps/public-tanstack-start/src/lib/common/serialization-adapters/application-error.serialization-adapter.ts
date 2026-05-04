import ApplicationError from '@portfolio/common/errors/application-error';
import { createSerializationAdapter } from '@tanstack/react-router';

const applicationErrorSerializationAdapter = createSerializationAdapter({
  key: 'ApplicationError',
  test: (value) => value instanceof ApplicationError,
  toSerializable: (value) => ({
    message: value.message,
    status: value.status,
  }),
  fromSerializable: (value) => new ApplicationError(value.status, value.message),
});

export default applicationErrorSerializationAdapter;
