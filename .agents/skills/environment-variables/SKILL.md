---
name: environment-variables
description: >
  Documents the standard pattern for loading, parsing, and validating
  environment variables in TanStack Start applications using Zod and
  `createIsomorphicFn`. Covers `env.config.ts` file structure, client vs
  server schemas, sourcing conventions, error handling, and how to add new
  environment variables.
  This skill is ONLY applicable to TanStack Start projects. To identify one,
  check that `@tanstack/react-start` is present in the app's `package.json`
  dependencies.
user-invocable: false
---

# Environment Variables — (TanStack Start)

This skill applies **only** to apps whose `package.json` contains `@tanstack/react-start`.

---

## Overview

Every TanStack Start app in the monorepo uses a single, canonical environment config file that:

1. **Separates** client and server environments using `createIsomorphicFn()`.
2. **Validates** all environment variables at runtime with Zod schemas.
3. **Prevents** cross-boundary misuse (calling server env on the client, and vice versa).

### Canonical File Location

```
src/configs/env/env.config.ts
```

All env config lives in this one file. Do **not** scatter `process.env` or `import.meta.env` access elsewhere in the app — always go through the exported functions.

---

## File Structure

The file exports three functions:

| Export | Description |
|---|---|
| `getClientEnv()` | Returns validated client-side env vars. Throws if called on the server. |
| `getServerEnv()` | Returns validated server-side env vars. Throws if called on the client. |
| `getEnv()` (default) | Isomorphic — calls `getClientEnv()` on the client and `getServerEnv()` on the server. |

### Full Template

```ts
import ApplicationError from '@portfolio/common/errors/application-error';
import { createIsomorphicFn } from '@tanstack/react-start';
import { env } from 'node:process';
import { z } from 'zod/v4';

export const getClientEnv = createIsomorphicFn()
  .client(() => {
    const clientEnvSchema = z.object({
      // -- Client-accessible vars --
      environment: z.literal('client').default('client'),
      // e.g. firebaseApiKey: z.string(),
      // e.g. gtmId: z.string().optional(),

      // -- Server-only vars (explicitly excluded) --
      // e.g. cmsToken: z.never().optional(),
    });

    const envConfig = clientEnvSchema.parse({
      // Read client vars from import.meta.env.PUBLIC_*
      // e.g. firebaseApiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as never,
    });

    return envConfig;
  })
  .server(() => {
    throw new ApplicationError(500, 'getClientEnv cannot be called from the server');
  });

export const getServerEnv = createIsomorphicFn()
  .client(() => {
    throw new ApplicationError(500, 'getServerEnv cannot be called from the client');
  })
  .server(() => {
    const serverEnvSchema = z.object({
      // -- Server vars --
      environment: z.literal('server').default('server'),
      // e.g. cmsToken: z.string(),
      // e.g. enableRobots: z.coerce.boolean(),

      // -- Public vars (also available on server) --
      // e.g. firebaseApiKey: z.string(),
    });

    const envConfig = serverEnvSchema.parse({
      // Server-only vars from node:process
      // e.g. cmsToken: env.CMS_TOKEN,
      // Public vars from import.meta.env
      // e.g. firebaseApiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY as never,
    });

    return envConfig;
  });

const getEnv = createIsomorphicFn()
  .client(() => getClientEnv())
  .server(() => getServerEnv());

export default getEnv;
```

---

## Core Conventions

### 1. `createIsomorphicFn()` is the Standard

Always use `createIsomorphicFn()` from `@tanstack/react-start` to split client and server env access. This is the canonical way to write isomorphic code in TanStack Start — **never** use runtime `typeof window` checks or similar hacks.

### 2. Sourcing Rules

| Variable type | Source | Naming convention |
|---|---|---|
| **Public / client** | `import.meta.env.PUBLIC_*` | `PUBLIC_` prefix (Vite convention) |
| **Server-only** | `import { env } from 'node:process'` | No prefix, SCREAMING_SNAKE_CASE |

- Always import `env` from `'node:process'` for server-only variables — do **not** use the global `process.env` directly.
- Client variables sourced via `import.meta.env` must be cast with `as never` to satisfy TypeScript (Vite's type stubs are stringly typed).

### 3. Client Schema — Exclude Server-Only Vars

In the client schema, explicitly mark every server-only variable as `z.never().optional()`. This makes the type contract clear: those keys exist in the type union but can never hold a value on the client.

```ts
const clientEnvSchema = z.object({
  // ✅ Available on client
  firebaseApiKey: z.string(),
  gtmId: z.string().optional(),

  // ❌ Server-only — explicitly excluded
  cmsToken: z.never().optional(),
  sentryDsn: z.never().optional(),
});
```

### 4. Server Schema — Include Public Vars

The server schema should include **all** variables — both server-only and public. The server needs access to public vars for SSR, meta tags, and other server-rendered content.

### 5. Branding (Optional)

You may add `.brand('ClientEnv')` or `.brand('ServerEnv')` to the schema for extra type safety, but this is **not required**.

```ts
const clientEnvSchema = z.object({ ... }).brand('ClientEnv'); // optional
```

### 6. Zod Schema Tips

| Scenario | Zod helper |
|---|---|
| Boolean from string (`"true"`, `"1"`, etc.) | `z.coerce.boolean()` |
| Number from string | `z.coerce.number()` |
| Default value | `.default('value')` or `.prefault('value')` |
| Fallback on bad input | `.catch('fallback')` |
| Enum with known values | `z.enum(['development', 'production'])` |
| Optional with undefined | `.optional()` |

---

## Error Handling

### Cross-Boundary Misuse

Each function has a "dead" branch that throws `ApplicationError(500)`:

- `getClientEnv()` → throws on the **server**
- `getServerEnv()` → throws on the **client**

This catches bugs at runtime where code accidentally imports the wrong getter.

```ts
import ApplicationError from '@portfolio/common/errors/application-error';

// Inside getClientEnv().server():
throw new ApplicationError(500, 'getClientEnv cannot be called from the server');

// Inside getServerEnv().client():
throw new ApplicationError(500, 'getServerEnv cannot be called from the client');
```

### Missing or Invalid Vars

Zod's `.parse()` will throw a `ZodError` at startup if any required variable is missing or fails validation. This is intentional — **fail early** rather than encountering cryptic errors deep in the app.

---

## Step-by-Step Guides

### Adding a New Public Env Var (Client + Server)

A "public" variable is one that is safe to expose to the browser (e.g., a Firebase API key, GTM ID).

1. **Add the env var** to your hosting provider / `.env` file with the `PUBLIC_` prefix:
   ```
   PUBLIC_MY_API_KEY=abc123
   ```

2. **Update the client schema** — add the variable with its Zod type:
   ```ts
   const clientEnvSchema = z.object({
     // ... existing vars
     myApiKey: z.string(),
   });
   ```

3. **Update the client parse block** — read from `import.meta.env`:
   ```ts
   const envConfig = clientEnvSchema.parse({
     // ... existing vars
     myApiKey: import.meta.env.PUBLIC_MY_API_KEY as never,
   });
   ```

4. **Update the server schema** — add the same variable (same Zod type):
   ```ts
   const serverEnvSchema = z.object({
     // ... existing vars
     myApiKey: z.string(),
   });
   ```

5. **Update the server parse block** — also read from `import.meta.env`:
   ```ts
   const envConfig = serverEnvSchema.parse({
     // ... existing vars
     myApiKey: import.meta.env.PUBLIC_MY_API_KEY as never,
   });
   ```

---

### Adding a New Server-Only Env Var

A "server-only" variable contains secrets or config that must never reach the browser (e.g., API tokens, DSNs).

1. **Add the env var** to your hosting provider / `.env` file (no `PUBLIC_` prefix):
   ```
   CMS_TOKEN=secret-token
   ```

2. **Update the client schema** — add it as `z.never().optional()`:
   ```ts
   const clientEnvSchema = z.object({
     // ... existing vars
     cmsToken: z.never().optional(),
   });
   ```

3. **Update the server schema** — add it with its actual Zod type:
   ```ts
   const serverEnvSchema = z.object({
     // ... existing vars
     cmsToken: z.string(),
   });
   ```

4. **Update the server parse block** — read from `node:process`:
   ```ts
   import { env } from 'node:process';
   // ...
   const envConfig = serverEnvSchema.parse({
     // ... existing vars
     cmsToken: env.CMS_TOKEN,
   });
   ```

---

### Adding a New Env Var with Coercion

For variables that are strings in the environment but need to be a different type in TypeScript:

```ts
// Boolean (e.g., "true" / "false" / "1" / "0")
enableRobots: z.coerce.boolean(),

// Number (e.g., "3000")
port: z.coerce.number(),

// Enum with fallback
sentryEnvironment: z.enum(['development', 'production']).catch('production'),
```

---

## Consuming the Env Config

### In Server Functions / Server-Only Code

```ts
import { getServerEnv } from '../configs/env/env.config';

const env = getServerEnv();
const token = env.cmsToken; // ✅ fully typed, validated
```

### In Client Components

```ts
import { getClientEnv } from '../configs/env/env.config';

const env = getClientEnv();
const apiKey = env.firebaseApiKey; // ✅ fully typed, validated
// env.cmsToken;                  // ❌ TypeScript error: type 'never'
```

### In Isomorphic Code

```ts
import getEnv from '../configs/env/env.config';

const env = getEnv();
// Returns ClientEnv on client, ServerEnv on server
```

---

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Put all env access in `src/configs/env/env.config.ts` | Scatter `process.env` / `import.meta.env` throughout the codebase |
| Use `createIsomorphicFn()` for client/server separation | Use `typeof window !== 'undefined'` checks |
| Import `env` from `'node:process'` for server vars | Use the global `process.env` directly |
| Mark server-only vars as `z.never().optional()` in client schema | Omit server-only vars from the client schema silently |
| Use `z.coerce.boolean()` for env booleans | Compare `process.env.FOO === 'true'` inline |
| Prefix client-exposed vars with `PUBLIC_` | Expose secrets without the prefix convention |
| Let Zod throw at startup for missing vars | Silently fall back to `undefined` and fail later |
| Cast `import.meta.env.*` reads with `as never` | Fight Vite's string-typed env stubs |
| Consume env via `getClientEnv()` / `getServerEnv()` / `getEnv()` | Access `import.meta.env` directly in components or server functions |
