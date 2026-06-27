# Error Handling — `QueryErrorResetBoundary` + `ErrorBoundary`

## Purpose

When `useSuspenseQuery` or `Await` throws (due to a failed server function call), the error must be caught by an error boundary. The project uses two layers:

1. **`QueryErrorResetBoundary`** (from `@tanstack/react-query`) — provides a `reset` callback that clears the React Query error state for all queries within it, enabling retry.
2. **`ErrorBoundary`** (from `src/components/atoms/error-boundary.tsx`) — a React class component that catches thrown errors, displays an error UI, and exposes a "Try again" button that calls both the React error boundary reset AND the React Query reset.

---

## Required Structure

Every `Await`+`Suspense` block **must** be wrapped in this exact order:

```tsx
<QueryErrorResetBoundary>
  <ErrorBoundary>
    <Suspense fallback={<LoadingFallback />}>
      <Await promise={somePromise}>
        {() => <InnerComponent />}
      </Await>
    </Suspense>
  </ErrorBoundary>
</QueryErrorResetBoundary>
```

**Do not swap the order.** `QueryErrorResetBoundary` must be the outer wrapper so that `ErrorBoundary` can access the reset function via React context.

---

## The `ErrorBoundary` Component

Located at `src/components/atoms/error-boundary.tsx`. It:
- Catches any thrown error within its subtree.
- Displays the error message in a styled `bg-destructive/5` card.
- Provides a "Try again" button that resets both the React error boundary and the React Query error state (via `QueryErrorResetBoundary`'s context).

**Import:**
```tsx
import { ErrorBoundary } from '../../../components/atoms/error-boundary';
```

The relative import depth depends on the route's nesting. Always import from `src/components/atoms/error-boundary`.

---

## Imports

```tsx
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from '../../../components/atoms/error-boundary';
```

---

## When There Are Multiple Deferred Sections

If a page has multiple independent `Await` blocks, each should have its own `QueryErrorResetBoundary` > `ErrorBoundary` > `Suspense` stack. This ensures an error in one section does not block the entire page:

```tsx
<div className="grid grid-cols-2 gap-6">
  {/* Section A — independent error boundary */}
  <QueryErrorResetBoundary>
    <ErrorBoundary>
      <Suspense fallback={<Skeleton />}>
        <Await promise={statsPromise}>
          {() => <StatsWidget />}
        </Await>
      </Suspense>
    </ErrorBoundary>
  </QueryErrorResetBoundary>

  {/* Section B — independent error boundary */}
  <QueryErrorResetBoundary>
    <ErrorBoundary>
      <Suspense fallback={<Skeleton />}>
        <Await promise={recentOrdersPromise}>
          {() => <RecentOrdersWidget />}
        </Await>
      </Suspense>
    </ErrorBoundary>
  </QueryErrorResetBoundary>
</div>
```

---

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Always wrap `Await` in `QueryErrorResetBoundary > ErrorBoundary > Suspense` | Use `Await` with only `Suspense` — errors won't be caught |
| Import `ErrorBoundary` from `src/components/atoms/error-boundary` | Create a custom error boundary for individual pages |
| Keep `QueryErrorResetBoundary` as the outermost of the three | Put `ErrorBoundary` outside `QueryErrorResetBoundary` — the reset won't work |
