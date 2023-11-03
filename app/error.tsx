'use client'; // Error components must be Client Components

import 'client-only';

import type ErrorBoundaryProps from './_common/types/error-props.type';

export default function ErrorBoundary(props: ErrorBoundaryProps) {
  const { error, reset } = props;

  return (
    <div>
      <h1>Something went wrong!</h1>
      <h2>Error Message: {error.message}</h2>
      <button onClick={reset} type="button">
        Reload the page
      </button>
    </div>
  );
}
