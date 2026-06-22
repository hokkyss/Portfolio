# Loader, `ensureQueryData`, `useLoaderData`, `Await`, `Suspense`

## Purpose

The `loader` function runs before the route component renders. It kicks off data fetches in parallel by calling `queryClient.ensureQueryData()` for each query the page needs. The fetches run on the server (SSR) or client, and results are stored in the React Query cache.

The loader **does not `await` these promises** — it returns them so the route component can use `Await` to gate rendering, enabling streaming/deferred UI.

---

## `loader` — Kicking Off Fetches

```ts
export const Route = createFileRoute('/_authenticated/purchase-orders/')(({
  loader: ({ context: { queryClient } }) => {
    return {
      posQueryPromise: queryClient.ensureQueryData(listPosQuery()),
    };
  },
  component: PoListPageWrapper,
});
```

**Rules:**
- Always destructure `queryClient` from `context` — it is injected by `createRootRouteWithContext`.
- Return an object with named promise properties (e.g., `posQueryPromise`). This makes `useLoaderData` type-safe.
- For routes needing multiple queries, return multiple promises or use `Promise.all(...)`:

```ts
loader: ({ context: { queryClient }, params: { poId } }) => {
  return {
    // two independent queries fetched in parallel
    formQueryPromise: Promise.all([
      queryClient.ensureQueryData(listSuppliersQuery()),
      queryClient.ensureQueryData(listProductsQuery()),
    ]),
    poQueryPromise: queryClient.ensureQueryData(getPurchaseOrderQuery(poId)),
  };
},
```

---

## `useLoaderData` — Retrieving the Promise in the Component

Inside the route component, retrieve the promise returned by the loader with `useLoaderData`. Always pass `from` with the exact route ID string:

```tsx
function PoListPageWrapper() {
  const posQueryPromise = useLoaderData({
    from: '/_authenticated/purchase-orders/',
    select: (d) => d.posQueryPromise,
  });
  // ...
}
```

**Rules:**
- Always pass `select` to extract only the property you need.
- The `from` string must match the route's path string exactly (as passed to `createFileRoute`).

---

## `Await` + `Suspense` — Gating Rendering Until Data Is Ready

Wrap the deferred promise inside `Suspense` > `Await`. The `fallback` prop on `Suspense` is shown while the promise is pending:

```tsx
<Suspense fallback={<Card className="p-8 text-center text-muted-foreground">Loading...</Card>}>
  <Await promise={posQueryPromise}>
    {() => <PoListTable />}
  </Await>
</Suspense>
```

**Rules:**
- `Await` takes a `promise` prop and a render-prop child `{() => <Component />}`.
- The render-prop child receives the resolved value, but you typically ignore it — the data is in the React Query cache and should be read with `useSuspenseQuery` inside the inner component.
- Always wrap `Await` in a `Suspense` with a meaningful `fallback`.
- Always wrap `Suspense` in a `QueryErrorResetBoundary` > `ErrorBoundary` (see [error-handling.md](./error-handling.md)).

**Static parts go in the Wrapper, not inside `Await`:**

Page elements that do not depend on the deferred data — like the page title, subtitle, or role-gated buttons based on already-cached auth state — belong in the Wrapper component, outside the `Await`. This way they render immediately without waiting for the promise.

```tsx
function PoListPageWrapper() {
  const posQueryPromise = useLoaderData({ ... });

  // Auth data is already cached from root loader — safe to read synchronously
  const { data: isOwner } = useSuspenseQuery({
    ...getAuthUserQuery(),
    select: (authUser) => authUser.role === 'OWNER',
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* ✅ Static header — renders immediately, no waiting */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Purchase Orders</h1>
        {isOwner && (
          <Button ...>New Purchase Order</Button>
        )}
      </div>

      {/* ⬇️ Dynamic content — waits for the promise */}
      <QueryErrorResetBoundary>
        <ErrorBoundary>
          <Suspense fallback={<Card className="p-8">Loading...</Card>}>
            <Await promise={posQueryPromise}>
              {() => <PoListTable />}
            </Await>
          </Suspense>
        </ErrorBoundary>
      </QueryErrorResetBoundary>
    </div>
  );
}
```

---

## Complete Example — List Page

```tsx
export const Route = createFileRoute('/_authenticated/purchase-orders/')(({
  loader: ({ context: { queryClient } }) => ({
    posQueryPromise: queryClient.ensureQueryData(listPosQuery()),
  }),
  component: PoListPageWrapper,
});

function PoListPageWrapper() {
  const posQueryPromise = useLoaderData({
    from: '/_authenticated/purchase-orders/',
    select: (d) => d.posQueryPromise,
  });
  const { data: isOwner } = useSuspenseQuery({
    ...getAuthUserQuery(),
    select: (u) => u.role === 'OWNER',
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Purchase Orders</h1>
        {isOwner && <Button render={<Link to="/purchase-orders/new" />}>New</Button>}
      </div>

      <QueryErrorResetBoundary>
        <ErrorBoundary>
          <Suspense fallback={<Card className="p-8 text-center">Loading...</Card>}>
            <Await promise={posQueryPromise}>
              {() => <PoListTable />}
            </Await>
          </Suspense>
        </ErrorBoundary>
      </QueryErrorResetBoundary>
    </div>
  );
}
```

---

## Complete Example — Detail Page (with params)

When the route has a URL param, pass it from `params` in the loader. See [suspense-query.md](./suspense-query.md) for how to read params inside the inner component.

```tsx
export const Route = createFileRoute('/_authenticated/purchase-orders/$poId')(({
  params: z.object({
    poId: z.coerce.number(), // ← coerce string URL param to number
  }),
  loader: ({ context: { queryClient }, params: { poId } }) => ({
    poQueryPromise: queryClient.ensureQueryData(getPurchaseOrderQuery(poId)),
  }),
  component: PoDetailPageWrapper,
});

function PoDetailPageWrapper() {
  const poQueryPromise = useLoaderData({
    from: '/_authenticated/purchase-orders/$poId',
    select: (d) => d.poQueryPromise,
  });

  return (
    <QueryErrorResetBoundary>
      <ErrorBoundary>
        <Suspense fallback={<div className="p-8">Loading...</div>}>
          <Await promise={poQueryPromise}>
            {() => <PoDetailPage />}
          </Await>
        </Suspense>
      </ErrorBoundary>
    </QueryErrorResetBoundary>
  );
}
```
