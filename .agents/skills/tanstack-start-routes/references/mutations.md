# Mutations — `useMutation`, Cache Updates, Toasts, Navigation, `beforeLoad`

## Purpose

Mutations are write operations triggered by user actions. They use `useMutation` from `@tanstack/react-query`, spread with a mutation factory from the `lib/` layer (see `project-architecture` skill). The route component is responsible for `onSuccess`/`onError` callbacks, cache updates, toasts, and navigation.

---

## `useMutation` — Basic Setup

```tsx
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { createPoMutation } from '../../../lib/purchase-orders/mutations/create-purchase-order.mutation';
import { listPosQuery } from '../../../lib/purchase-orders/queries/list-pos.query';

const { isPending, mutate: createPo } = useMutation({
  ...createPoMutation(),           // spread the mutation options from lib/
  onSuccess: async (_data, _variables, _onMutateResult, context) => {
    await context.client.invalidateQueries({ queryKey: listPosQuery().queryKey });
    toast.success('Purchase order created successfully.');
    throw redirect({ to: '/purchase-orders' });
  },
  onError: (error) => {
    toast.error(error instanceof Error ? error.message : 'Something went wrong.');
  },
});
```

**Rules:**
- Always spread `...mutationFactory()` first, then add `onSuccess`/`onError`.
- Use `context.client` (injected by React Query's `MutationContext`) to access `queryClient` inside `onSuccess`.
- Never put `onSuccess`/`onError` inside the mutation factory in `lib/` — they belong here, in the route.

---

## Feedback — Toasts (Sonner)

Use `toast` from `sonner` for all mutation feedback. The `<Toaster>` is already mounted in `__root.tsx`.

```tsx
import { toast } from 'sonner';

// Success
toast.success('Purchase order received.');

// Error
toast.error('Failed to receive purchase order. Please try again.');

// Dynamic error message from server
onError: (error) => {
  toast.error(error instanceof Error ? error.message : 'Something went wrong.');
},
```

**Rules:**
- Always use `toast.success()` for successful mutations.
- Always use `toast.error()` for failed mutations.
- Do **not** render mutation errors as inline `div` elements in the page — use `toast.error()` instead.
- Do **not** use `alert()` or `console.error()` for user-facing errors.

---

## Cache Updates — Two Strategies

### Strategy 1: `invalidateQueries` — Refetch from Server

Use after any mutation to ensure the cache reflects the latest server state:

```tsx
onSuccess: async (_data, _variables, _onMutateResult, context) => {
  // Invalidate all queries whose data may have changed
  await context.client.invalidateQueries({ queryKey: listPosQuery().queryKey });
  await context.client.invalidateQueries({ queryKey: listProductsQuery().queryKey });
  toast.success('Purchase order received.');
},
```

**Use when:** The mutation changes multiple queries (e.g., receiving a PO updates both the PO list and product stock levels).

---

### Strategy 2: `setQueryData` + `invalidateQueries` — Optimistic Removal

For delete operations, update the cache immediately (optimistic) before the refetch arrives, so the UI feels instant:

```tsx
onSuccess: (_data, variables, _onMutateResult, context) => {
  // 1. Instantly remove the deleted item from the cache
  context.client.setQueryData(
    listProductsQuery().queryKey,
    (queryData) => queryData ? queryData.filter((p) => p.id !== variables.id) : [],
  );
  // 2. Refetch from server to confirm and sync any other changes
  return context.client.invalidateQueries({ queryKey: listProductsQuery().queryKey });
},
```

**Use when:** A single entity is deleted from a list and you want the removal to feel instant.

---

## Navigation After Mutations

Use `throw redirect(...)` after a successful mutation when you want to navigate imperatively (e.g., redirect to the list page after creating a new item):

```tsx
onSuccess: async (_data, _variables, _onMutateResult, context) => {
  await context.client.invalidateQueries({ queryKey: listPosQuery().queryKey });
  toast.success('Purchase order created.');
  throw redirect({ to: '/purchase-orders' });   // ← always throw, never call
},
```

For navigation triggered by event handlers (e.g., a cancel button), use `router.navigate()`:

```tsx
import { useRouter } from '@tanstack/react-router';

const router = useRouter();

const handleCancel = () => {
  void router.navigate({ to: '/products' });   // ← not thrown, called as a function
};
```

**Summary:**

| Context | Method |
|---|---|
| Inside `beforeLoad` | `throw redirect(...)` |
| Inside `onSuccess` | `throw redirect(...)` |
| Inside an event handler | `router.navigate(...)` |

---

## `beforeLoad` — Route-Level Access Guards

Use `beforeLoad` in the route config to redirect unauthorized users before the route loads. This is for **client-side** role guards on specific pages:

```tsx
export const Route = createFileRoute('/_authenticated/purchase-orders/new')({
  beforeLoad: ({ context }) => {
    if (context.user.role !== 'OWNER') {
      throw redirect({ to: '/' });
    }
  },
  loader: ({ context }) => { ... },
  component: NewPoPage,
});
```

**Rules:**
- `beforeLoad` runs before `loader` — if it throws a redirect, the loader is never called.
- Use `context.user` (set by the root route's `beforeLoad`) to check auth/role.
- The `_authenticated.tsx` layout route already redirects unauthenticated users to `/login`. Use route-level `beforeLoad` only for additional role-based restrictions.
- Always `throw redirect(...)` — never return it.

---

## Complete Example — Create Page with Full Pattern

```tsx
export const Route = createFileRoute('/_authenticated/purchase-orders/new')({
  beforeLoad: ({ context }) => {
    if (context.user.role !== 'OWNER') {
      throw redirect({ to: '/' });
    }
  },
  loader: ({ context }) => ({
    depsPromise: Promise.all([
      context.queryClient.ensureQueryData(listSuppliersQuery()),
      context.queryClient.ensureQueryData(listProductsQuery()),
    ]),
  }),
  component: NewPoPage,
});

function NewPoPage() {
  const depsPromise = useLoaderData({
    from: '/_authenticated/purchase-orders/new',
    select: (d) => d.depsPromise,
  });

  const { isPending, mutate: createPo } = useMutation({
    ...createPoMutation(),
    onSuccess: async (_data, _variables, _onMutateResult, context) => {
      await context.client.invalidateQueries({ queryKey: listPosQuery().queryKey });
      toast.success('Purchase order created.');
      throw redirect({ to: '/purchase-orders' });
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Something went wrong.');
    },
  });

  const handleCancel = () => {
    throw redirect({ to: '/purchase-orders' });
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">New Purchase Order</h1>

      <QueryErrorResetBoundary>
        <ErrorBoundary>
          <Suspense fallback={<div>Loading form data...</div>}>
            <Await promise={depsPromise}>
              {() => (
                <PoForm
                  isSubmitting={isPending}
                  onCancel={handleCancel}
                  onSubmit={(data) => createPo({
                    supplierId: data.supplier.id,
                    items: data.items.map((i) => ({
                      productId: i.product.id,
                      quantity: i.quantity,
                      unitCost: i.unitCost,
                    })),
                    notes: data.notes,
                  })}
                />
              )}
            </Await>
          </Suspense>
        </ErrorBoundary>
      </QueryErrorResetBoundary>
    </div>
  );
}
```

Note how the form values are **mapped** to the DTO shape inside `onSubmit` — the form holds full objects (e.g., `supplier`, `product`) while the DTO only needs IDs. See the `project-architecture` skill for details on form vs DTO shape differences.
