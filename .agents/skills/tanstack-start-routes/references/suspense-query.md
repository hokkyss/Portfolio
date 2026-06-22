# `useSuspenseQuery`, `useParams`, `select`

## Purpose

Inside the inner page component (rendered after `Await` resolves), use `useSuspenseQuery` to read data from the React Query cache. Because `ensureQueryData` in the loader already populated the cache, `useSuspenseQuery` resolves synchronously — no loading state or suspense fallback is triggered again.

---

## `useSuspenseQuery` — Reading Cached Data

```tsx
function PoListTable() {
  const { data: purchases } = useSuspenseQuery(listPosQuery());
  // purchases is guaranteed to be defined — no null checks needed
}
```

**Rules:**
- Always use `useSuspenseQuery`, never `useQuery`, inside components that live inside an `Await` block.
- The query options passed to `useSuspenseQuery` must match what was passed to `ensureQueryData` in the loader — use the same factory function (e.g., `listPosQuery()`, `getPurchaseOrderQuery(id)`).
- `data` is always defined — `useSuspenseQuery` throws (to the nearest `Suspense` boundary) if the data is not yet available.

---

## `select` — Deriving Values from Cached Data

Use the `select` option to derive a computed value from the raw query data. The selector runs client-side and does not re-fetch:

```tsx
// Reading a derived boolean from the auth user
const { data: isOwner } = useSuspenseQuery({
  ...getAuthUserQuery(),
  select: (authUser) => authUser.role === 'OWNER',
});

// Using the derived value directly
{isOwner && <Button>Admin-only action</Button>}
```

**When to use `select`:**
- When you need only a slice of the data (e.g., just `role` from the auth user).
- When you need a computed boolean or transformed value.
- When you want to avoid re-renders on unrelated cache updates (React Query memoizes the selected value).

---

## Auth Data Is Always Available

The root loader (`__root.tsx`) calls `ensureQueryData(getAuthUserQuery())` in `beforeLoad`, so auth data is pre-populated in the cache before any route renders. You can safely call `useSuspenseQuery(getAuthUserQuery())` anywhere — both in Wrapper components and inner page components — without additional loading state:

```tsx
// In the Wrapper — safe, no Await needed for auth data
const { data: isOwner } = useSuspenseQuery({
  ...getAuthUserQuery(),
  select: (u) => u.role === 'OWNER',
});

// In the inner page component — also safe
const { data: user } = useSuspenseQuery(getAuthUserQuery());
```

---

## `useParams` — Reading URL Params in the Inner Component

For routes with URL params, read the coerced param with `useParams`. Always pass `from` and `select`:

```tsx
export const Route = createFileRoute('/_authenticated/purchase-orders/$poId')(({
  params: z.object({
    poId: z.coerce.number(), // coerces string → number at the router level
  }),
  // ...
});

function PoDetailPage() {
  const poId = useParams({
    from: '/_authenticated/purchase-orders/$poId',
    select: (p) => p.poId, // already a number thanks to z.coerce.number()
  });

  const { data: po } = useSuspenseQuery(getPurchaseOrderQuery(poId));
  // ...
}
```

**Numeric params convention:**
- Always declare `params: z.object({ <paramName>: z.coerce.number() })` in the route config for numeric URL params.
- This coerces the string from the URL to a number before it reaches the component.
- Never manually `parseInt()` params in the component.

---

## Complete Example — Inner Component

```tsx
function PoDetailPage() {
  // Read numeric URL param (already coerced to number by route config)
  const poId = useParams({
    from: '/_authenticated/purchase-orders/$poId',
    select: (p) => p.poId,
  });

  // Read auth state — always available synchronously
  const { data: isOwner } = useSuspenseQuery({
    ...getAuthUserQuery(),
    select: (u) => u.role === 'OWNER',
  });

  // Read domain data — cache was populated by loader's ensureQueryData
  const { data: po } = useSuspenseQuery(getPurchaseOrderQuery(poId));

  return (
    <div>
      <h1>Purchase Order #{po.id}</h1>
      <p>Status: {po.status}</p>
      {isOwner && <Button>Owner action</Button>}
    </div>
  );
}
```
