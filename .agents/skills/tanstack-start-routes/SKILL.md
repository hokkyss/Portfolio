---
name: tanstack-start-routes
description: >
  Documents route-level data fetching and error handling patterns for the `apps/sales-web`
  TanStack Start application. Covers how to use `loader` with `ensureQueryData`, `Await`,
  `useSuspenseQuery`, `QueryErrorResetBoundary`, and `ErrorBoundary` in route files.
  This skill is ONLY applicable to TanStack Start projects. To identify one, check that
  `@tanstack/react-start` is present in the app's `package.json` dependencies.
user-invocable: false
---

# TanStack Start — Route Patterns (`apps/sales-web`)

This skill applies **only** to apps whose `package.json` contains `@tanstack/react-start`.

> **Note:** This skill covers the **route layer** (`src/routes/`). For the lib layer (dto, functions, queries, mutations, forms), see the `project-architecture` skill.

---

## Route File Structure

Routes live in `src/routes/` and follow TanStack Router's file-based conventions:

```
routes/
├── __root.tsx                     # Root layout (Shell, ThemeProvider, Toaster, devtools)
├── index.tsx                      # "/" — redirects to /dashboard
├── login.tsx                      # "/login" — public, redirects to /dashboard if already logged in
├── _authenticated.tsx             # Layout route: auth guard + Sidebar
└── _authenticated/
    ├── dashboard.tsx              # "/dashboard"
    ├── settings.tsx               # "/settings" — layout route with sub-routes
    ├── products/
    │   ├── index.tsx              # "/products"
    │   ├── new.tsx                # "/products/new"
    │   └── $productId.tsx         # "/products/:productId"
    ├── purchase-orders/
    │   ├── index.tsx              # "/purchase-orders"
    │   ├── new.tsx                # "/purchase-orders/new"
    │   └── $poId.tsx              # "/purchase-orders/:poId"
    └── ...
```

---

## How the Patterns Connect

Every data-fetching route follows the same flow:

```
Route config (loader + beforeLoad)
        │
        │  queryClient.ensureQueryData(someQuery())   ← kicks off fetch, returns Promise
        ▼
Route component (Wrapper)
        │
        │  useLoaderData()         ← retrieves the Promise from loader
        │  useSuspenseQuery()      ← reads already-cached auth data synchronously
        │
        ▼  [renders static parts — header, page title, role-gated buttons]
        │
        ▼
QueryErrorResetBoundary > ErrorBoundary > Suspense > Await(promise)
        │
        │  [fallback shown while Promise is pending]
        │
        ▼
Inner page component (rendered when Promise resolves)
        │
        │  useSuspenseQuery()      ← reads the now-populated cache entry
        │  useMutation()           ← sets up write operations
        ▼
```

The key insight: `ensureQueryData` in the `loader` kicks off the server-side fetch and populates the cache. `Await` gates rendering until the promise resolves. Once inside `Await`'s render function, `useSuspenseQuery` reads from the cache synchronously — no loading state needed.

---

## Deferred Data and Suspense

When using deferred data inside a route, ALWAYS wrap the `Await` component in a `Suspense` boundary and provide a fallback skeleton:

```tsx
<Suspense fallback={<ListSkeleton />}>
  <Await promise={deferredQueryPromise}>
    {(data) => <InnerComponent />}
  </Await>
</Suspense>
```

This ensures the user sees a skeleton loader while the data is fetching, instead of the route transition blocking until the data resolves.

## Form Validation States

When combining TanStack Router with TanStack Form, surface loader data (like validation error states or previous submission values) to the form components. If the server function throws a validation error, ensure the `useMutation`'s `onError` callback correctly wires the errors back into the form fields using the form instance API.

---

## Pattern Reference Files

- [loader.md](./references/loader.md) — `loader`, `ensureQueryData`, `useLoaderData`, `Await`, `Suspense`
- [suspense-query.md](./references/suspense-query.md) — `useSuspenseQuery`, `useParams`, `select`
- [error-handling.md](./references/error-handling.md) — `QueryErrorResetBoundary`, `ErrorBoundary`
- [mutations.md](./references/mutations.md) — `useMutation`, `onSuccess`, cache updates, toasts, navigation, `beforeLoad` guards

---

## Quick Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Start every data-fetching loader with `queryClient.ensureQueryData(...)` | Fetch data directly inside the component with `useEffect` |
| Wrap deferred data in `QueryErrorResetBoundary > ErrorBoundary > Suspense > Await` | Use `Await` without wrapping it in both `Suspense` AND an error boundary |
| Use `useSuspenseQuery` inside the inner component (after `Await` resolves) | Use `useQuery` with loading/error checks; let Suspense handle it |
| Put static page parts (title, header, role-gated buttons) in the Wrapper component | Put all JSX inside the inner component (it can't render until the promise resolves) |
| Use `z.coerce.number()` in `params:` for numeric URL params | Manually parse `params.id` with `parseInt()` in the component |
| Use `toast.success()` / `toast.error()` from `sonner` for mutation feedback | Show mutation results only via inline divs or `alert()` |
| Use `router.navigate()` for programmatic navigation in event handlers | Use `throw redirect(...)` inside event handlers |
| Use `throw redirect(...)` inside `beforeLoad` and `onSuccess` | Use `router.navigate()` inside `beforeLoad` |
