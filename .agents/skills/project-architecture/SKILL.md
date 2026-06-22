---
name: project-architecture
description: >
  Documents the `lib/` layer architecture for the TanStack Start applications.
  Covers how to create and connect DTOs, server functions, queries, mutations, and forms for a
  feature domain.
  This skill is ONLY applicable to TanStack Start projects. To identify one, check that
  `@tanstack/react-start` is present in the app's `package.json` dependencies.
user-invocable: false
---

# Project Architecture — (TanStack Start)

This skill applies **only** to apps whose `package.json` contains `@tanstack/react-start`.

---

## Overview

The `src/` directory is structured as follows:

```
src/
├── components/       # Reusable UI components (atoms, organisms, layout, per-domain)
├── configs/          # Environment config
├── db/               # Drizzle ORM client + schema definitions
├── firebase/         # Firebase admin/client setup
├── lib/              # Feature domains — the primary layer this skill documents
│   ├── common/       # Shared concerns (auth queries, auth middleware, hooks)
│   └── <domain>/     # One directory per feature domain
│       ├── dto/
│       ├── forms/
│       ├── functions/
│       ├── mutations/
│       └── queries/
├── paraglide/        # i18n messages and runtime (Paraglide)
├── routes/           # TanStack Router file-based routes
└── utils/            # Small shared utilities
```

The **`lib/<domain>/`** layer is the backbone of every feature. This skill documents its five sub-layers and how they connect.

---

## The Five Sub-Layers of `lib/<domain>/`

### 1. `dto/` — Data Transfer Objects

**Purpose:** Define and validate the shape of data crossing the server/client boundary using Zod.

**Conventions:**
- One file per operation: `create-<entity>.dto.ts`, `list-<entity>s.dto.ts`, `get-<entity>.dto.ts`, etc.
- Each file exports a **request schema**, a **response schema**, and their corresponding TypeScript types.
- Types are exported as:
  - `<Operation><Entity>RequestDto` (`z.input<>` — what comes *in*)
  - `<Operation><Entity>ResponseDto` (`z.output<>` — what goes *out*)
- **Response DTOs must be parsed** — every server function calls `.parse()` on its return value.
- For empty request bodies, export an empty `z.object({})` (never skip the DTO).
- **Reuse Shared Types**: If a schema or DTO is used across multiple domains or packages (e.g., pagination, phone numbers), import it from `@portfolio/common` instead of duplicating it in the local `dto/` folder.

**Example — `dto/list-purchase-orders.dto.ts`:**

```ts
import z from 'zod';

export const listPurchaseOrdersRequestDto = z.object({});
export type ListPurchaseOrdersRequestDto = z.input<typeof listPurchaseOrdersRequestDto>;

export const listPurchaseOrdersResponseDto = z.array(
  z.object({
    createdAt: z.date(),
    id: z.number(),
    status: z.enum(['PENDING', 'RECEIVED', 'CANCELLED']),
    total: z.coerce.number(), // coerce because Drizzle returns decimal columns as strings
  }),
);
export type ListPurchaseOrdersResponseDto = z.output<typeof listPurchaseOrdersResponseDto>;
```

**Example — `dto/create-purchase-order.dto.ts`:**

```ts
import z from 'zod';

export const createPurchaseOrderRequestDto = z.object({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().min(1),
    unitCost: z.number(),
  })).min(1),
  notes: z.string().optional().default(''),
  supplierId: z.number(),
});
export type CreatePurchaseOrderRequestDto = z.input<typeof createPurchaseOrderRequestDto>;

export const createPurchaseOrderResponseDto = z.object({
  createdAt: z.date(),
  id: z.number(),
  status: z.enum(['PENDING', 'RECEIVED', 'CANCELLED']),
});
export type CreatePurchaseOrderResponseDto = z.output<typeof createPurchaseOrderResponseDto>;
```

---

### 2. `functions/` — Server Functions

**Purpose:** Contain all server-side logic — database access, business rules, auth guards. These run **only on the server** and are created with `createServerFn` from `@tanstack/react-start`.

**Conventions:**
- One file per operation: `list-<entity>s.function.ts`, `create-<entity>.function.ts`, etc.
- File exports a **default** export (the server function instance).
- **Always** chain `.middleware([authUserMiddleware])` — no exceptions.
- **Always** chain `.inputValidator(<requestDto>)` even for GET requests with empty bodies.
- **Always** call `<responseDto>.parse(result)` before returning.
- GET operations use `method: 'GET'`; write operations use `method: 'POST'`.
- Authorization checks (role guards) live **inside the handler**, not in middleware.
- Database access (Drizzle) belongs **only** in server functions — never in queries or mutations.

**Middleware — `lib/common/auth/middlewares/auth-user.middleware.ts`:**

The sole middleware in the app. It:
1. Reads the Firebase session cookie.
2. Verifies it with Firebase Admin.
3. Looks up the user's role from the database.
4. Injects `context.user: AuthUser | null` into the server context.

```ts
export type AuthUser = {
  email: string;
  id: string;
  name: string;
  role: 'CLERK' | 'OWNER';
};
```

**Always import and apply it:**
```ts
import authUserMiddleware from '../../common/auth/middlewares/auth-user.middleware';
```

**Example — `functions/list-purchase-orders.function.ts` (GET):**

```ts
import { createServerFn } from '@tanstack/react-start';
import { desc } from 'drizzle-orm';
import { db } from '../../../db/client';
import { purchaseOrders } from '../../../db/schema';
import authUserMiddleware from '../../common/auth/middlewares/auth-user.middleware';
import { listPurchaseOrdersRequestDto, listPurchaseOrdersResponseDto } from '../dto/list-purchase-orders.dto';

const listPurchaseOrdersFunction = createServerFn({ method: 'GET' })
  .inputValidator(listPurchaseOrdersRequestDto)
  .middleware([authUserMiddleware])
  .handler(async ({ context }) => {
    if (!context.user) {
      throw new Error('Unauthorized');
    }

    const results = await db.query.purchaseOrders.findMany({
      orderBy: [desc(purchaseOrders.createdAt)],
      with: { supplier: true },
    });

    return listPurchaseOrdersResponseDto.parse(results);
  });

export default listPurchaseOrdersFunction;
```

**Example — `functions/create-purchase-order.function.ts` (POST with role guard):**

```ts
import { createServerFn } from '@tanstack/react-start';
import { db } from '../../../db/client';
import { purchaseOrders, purchaseOrderItems } from '../../../db/schema';
import authUserMiddleware from '../../common/auth/middlewares/auth-user.middleware';
import { createPurchaseOrderRequestDto, createPurchaseOrderResponseDto } from '../dto/create-purchase-order.dto';

const createPurchaseOrderFunction = createServerFn({ method: 'POST' })
  .middleware([authUserMiddleware])
  .inputValidator(createPurchaseOrderRequestDto)
  .handler(async ({ context, data }) => {
    if (!context.user || context.user.role !== 'OWNER') {
      throw new Error('Forbidden: Only owners can create purchase orders');
    }

    const result = await db.transaction(async (tx) => {
      const [newPo] = await tx.insert(purchaseOrders).values({ ... }).returning();
      await tx.insert(purchaseOrderItems).values([...]);
      return newPo;
    });

    return createPurchaseOrderResponseDto.parse(result);
  });

export default createPurchaseOrderFunction;
```

---

### 3. `queries/` — React Query Query Options

**Purpose:** Wrap GET server functions as TanStack Query query options so route loaders and components can consume them consistently.

**Conventions:**
- One file per query: `list-<entity>s.query.ts`, `get-<entity>.query.ts`.
- File exports a **named factory function** `<verb><Entity>Query` that returns `queryOptions(...)`.
- The function takes any required parameters (e.g., an ID) and passes them to the server function.
- **No business logic or db access** — only call the corresponding server function.
- `queryKey` should be a stable, serializable array that uniquely identifies the data:
  - List: `['<entity-plural>']`
  - Detail: `['<entity-plural>', id]`

**Example — `queries/list-pos.query.ts`:**

```ts
import { queryOptions } from '@tanstack/react-query';
import listPurchaseOrdersFunction from '../functions/list-purchase-orders.function';

export default function listPosQuery() {
  return queryOptions({
    queryKey: ['purchase-orders'],
    queryFn: ({ signal }) => listPurchaseOrdersFunction({ data: {}, signal }),
  });
}
```

**Example — `queries/get-purchase-order.query.ts`:**

```ts
import { queryOptions } from '@tanstack/react-query';
import getPurchaseOrderFunction from '../functions/get-po.function';

export default function getPurchaseOrderQuery(id: number) {
  return queryOptions({
    queryKey: ['purchase-orders', id],
    queryFn: ({ signal }) => getPurchaseOrderFunction({ data: { id }, signal }),
  });
}
```

---

### 4. `mutations/` — React Query Mutation Options

**Purpose:** Wrap POST server functions as TanStack Query mutation options.

**Conventions:**
- One file per mutation: `create-<entity>.mutation.ts`, `update-<entity>.mutation.ts`, etc.
- File exports a **named factory function** `<verb><Entity>Mutation` returning `mutationOptions(...)`.
- The `mutationFn` calls the corresponding server function with `{ data }`.
- **No business logic, no `onSuccess`/`onError`** — those are the component's responsibility.
- Import the **type** of the request DTO to type the `mutationFn` argument.
- `mutationKey` should be a stable, serializable array that uniquely identifies the mutation

**Example — `mutations/create-purchase-order.mutation.ts`:**

```ts
import { mutationOptions } from '@tanstack/react-query';
import type { CreatePurchaseOrderRequestDto } from '../dto/create-purchase-order.dto';
import createPurchaseOrderFunction from '../functions/create-purchase-order.function';

export default function createPurchaseOrderMutation() {
  return mutationOptions({
    mutationFn: (data: CreatePurchaseOrderRequestDto) => createPurchaseOrderFunction({ data }),
    mutationKey: ['create-purchase-order'],
  });
}
```

**Example — `mutations/receive-purchase-order.mutation.ts`:**

```ts
import { mutationOptions } from '@tanstack/react-query';
import type { ReceivePurchaseOrderRequestDto } from '../dto/receive-purchase-order.dto';
import receivePurchaseOrderFunction from '../functions/receive-purchase-order.function';

export default function receivePurchaseOrderMutation() {
  return mutationOptions({
    mutationFn: (data: ReceivePurchaseOrderRequestDto) => receivePurchaseOrderFunction({ data }),
    mutationKey: ['receive-purchase-order'],
  });
}
```

---

### 5. `forms/` — TanStack Form Options

**Purpose:** Define form schema and default values using `@tanstack/react-form` + Zod. This is the client-side form contract.

**Conventions:**
- One file per form: `create-<entity>.form.ts`.
- Uses `formOptions()` from `@tanstack/react-form` with a Zod validator and `revalidateLogic`.
- The form schema is defined **inline** in the file — do not reuse from DTO. Form shapes are wider (e.g., they hold full related objects for pickers, whereas DTOs only need IDs).
- Export a **named factory function** `<verb><Entity>FormOptions` returning `formOptions(...)`.
- Export the form input type as `<Verb><Entity>FormInput` using `z.input<>`.
- Always use `canSubmitWhenInvalid: true` to allow submitting with error display.
- Always use `revalidateLogic({ mode: 'submit', modeAfterSubmission: 'change' })`.

**Example — `forms/create-po.form.ts`:**

```ts
import { formOptions, revalidateLogic } from '@tanstack/react-form';
import z from 'zod';

const createPurchaseOrderFormSchema = z.object({
  items: z.array(z.object({
    product: z.object({ id: z.number(), name: z.string() /* full shape */ }),
    quantity: z.number().min(1),
    unitCost: z.number(),
  })).min(1, 'At least one item is required'),
  notes: z.string().optional().default(''),
  supplier: z.object({ id: z.number(), name: z.string() }),
});

export type CreatePurchaseOrderFormInput = z.input<typeof createPurchaseOrderFormSchema>;

export default function createPurchaseOrderFormOptions() {
  return formOptions({
    canSubmitWhenInvalid: true,
    defaultValues: {
      items: [],
      notes: '',
      supplier: null,
    } as unknown as CreatePurchaseOrderFormInput,
    validationLogic: revalidateLogic({ mode: 'submit', modeAfterSubmission: 'change' }),
    validators: {
      onDynamic: createPurchaseOrderFormSchema,
    },
  });
}
```

---

## How the Layers Connect

```
UI Component
    │
    │  useAppForm({ ...createPurchaseOrderFormOptions() })
    │  useMutation({ ...createPurchaseOrderMutation(), onSuccess: () => queryClient.invalidateQueries(...) })
    ▼
mutations/<entity>.mutation.ts   ──calls──▶   functions/<entity>.function.ts
                                                    │
queries/<entity>.query.ts        ──calls──▶   functions/<entity>.function.ts
    ▲                                               │
    │                                              [.middleware]   → authUserMiddleware
Route loader: queryClient.ensureQueryData(...)     [.inputValidator] → requestDto
Component:    useSuspenseQuery(<entity>Query())    [.handler]  → db (Drizzle) + business logic
                                                  [return]    → responseDto.parse(result)
```

**Data flow for a write operation:**
1. User submits form (options from `forms/`)
2. Component **maps** form values → DTO shape (e.g., `supplier.id` instead of full `supplier` object)
3. `useMutation` calls `mutationFn` from `mutations/`
4. Mutation calls the server function from `functions/`
5. Server function: validates input via `.inputValidator()` → checks auth via middleware → runs db logic → returns parsed response
6. On `onSuccess`, component calls `queryClient.invalidateQueries({ queryKey: <entity>Query().queryKey })`

---

## Error Handling

Server functions must explicitly throw errors when things go wrong so that React Query (or route boundaries) can catch them.

- **Validation Errors:** Thrown automatically by `.inputValidator()`. You do not need to try/catch these.
- **Authorization Errors:** Throw standard errors (e.g., `throw new Error('Unauthorized')` or `throw new Error('Forbidden')`) inside the handler.
- **Database/Business Logic Errors:** Throw standard errors with descriptive messages (e.g., `throw new Error('Insufficient inventory for product X')`). Do not expose raw database stack traces to the client.

The `apps/sales-web` routes will catch these via `QueryErrorResetBoundary` and display them appropriately.

---

## Naming Conventions

| Layer | File pattern | Export pattern |
|---|---|---|
| DTO | `<verb>-<entity>.dto.ts` | `<verb><Entity>RequestDto`, `<verb><Entity>ResponseDto` |
| Function | `<verb>-<entity>.function.ts` | `default` |
| Query | `<verb>-<entity>s.query.ts` | `<verb><Entity>Query` (factory fn) |
| Mutation | `<verb>-<entity>.mutation.ts` | `<verb><Entity>Mutation` (factory fn) |
| Form | `<verb>-<entity>.form.ts` | `<verb><Entity>FormOptions` (factory fn), `<Verb><Entity>FormInput` (type) |

- Use **singular** for single-item operations: `get-purchase-order`, `create-purchase-order`
- Use **plural** for list operations: `list-purchase-orders`
- Filenames use **kebab-case**; exports use **camelCase** (functions/types) or **PascalCase** (types)

---

## Step-by-Step: Adding a New Feature Domain

Follow this sequence when adding a new domain (e.g., `invoices`):

### Step 1 — Create the domain directory structure

```
src/lib/invoices/
├── dto/
├── forms/         # only if the domain has forms
├── functions/
├── mutations/     # only if the domain has write operations
└── queries/
```

### Step 2 — Write DTOs first

For each operation, create a file in `dto/` with request + response Zod schemas and their TypeScript types. Always export both `z.input<>` (request) and `z.output<>` (response) types.

### Step 3 — Write server functions

For each operation, create a file in `functions/` using `createServerFn`.
- **Always** chain `.middleware([authUserMiddleware])`.
- **Always** chain `.inputValidator(<requestDto>)`.
- Put all db access and business logic in `.handler()`.
- **Always** `return <responseDto>.parse(result)`.

### Step 4 — Write queries (for GET operations)

Wrap each GET server function in `queryOptions()` in `queries/`. Export a factory function with a stable `queryKey`.

### Step 5 — Write mutations (for POST operations)

Wrap each POST server function in `mutationOptions()` in `mutations/`. Export a pure factory function — no callbacks.

### Step 6 — Write forms (if the feature has a create/edit form)

Define the form schema in `forms/`. The schema can be wider than the DTO to accommodate picker objects.

### Step 7 — Use in routes and components

- Route `loader` → `queryClient.ensureQueryData(<domain>Query())` for deferred data
- Components → `useSuspenseQuery(<domain>Query())` to read data
- Components → `useMutation({ ...<domain>Mutation(), onSuccess: ... })` to write data
- On success → `queryClient.invalidateQueries({ queryKey: <domain>Query().queryKey })`

---

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Always attach `.middleware([authUserMiddleware])` to every server function | Skip middleware on seemingly "public" GET endpoints |
| Always `.inputValidator(requestDto)` even for empty bodies | Omit input validation on any server function |
| Always `responseDto.parse(result)` before returning | Return raw Drizzle results without parsing |
| Put all `db` access inside `functions/` | Access `db` from inside `queries/`, `mutations/`, or components |
| Keep `mutations/` pure — no `onSuccess`, no side effects | Put `invalidateQueries` or toast logic inside mutation options |
| Map form values → DTO shape inside the component before calling `mutate()` | Pass the full form object directly to `mutate()` (shapes are different) |
| Use `z.coerce.number()` in response DTOs for Drizzle decimal/numeric columns | Assume Drizzle always returns JS numbers |
| Export query/mutation options as factory **functions** (e.g., `listPosQuery()`) | Export them as plain objects (params must be re-evaluated at call time) |
| Use Drizzle `db.transaction()` for multi-table writes | Issue multiple sequential `await db.insert()` calls without a transaction |
| Throw `new Error('Forbidden')` when role check fails inside the handler | Rely solely on middleware for authorization |
