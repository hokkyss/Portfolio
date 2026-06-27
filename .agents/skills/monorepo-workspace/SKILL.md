---
name: monorepo-workspace
description: >
  Documents how to interact with the shared packages in the monorepo,
  specifically `packages/common` and `packages/utils`. Covers export patterns,
  Vite resolution, and when to put code in these packages versus the main app.
user-invocable: false
---

# Monorepo Workspace & Shared Packages

This skill applies to the monorepo, covering the use of `packages/common` and `packages/utils`.

## Overview

The monorepo contains shared libraries in `packages/`:
- **`@portfolio/common`**: Shared types, DTOs, Zod schemas, and business constants (e.g. `pagination.dto.ts`, `logger`).
- **`@portfolio/utils`**: Pure, domain-agnostic utility functions (e.g., date formatting helpers, string manipulators).

## 1. Export Patterns (`package.json`)

Both packages use conditional `exports` to support optimal local development and production builds.

```json
"exports": {
  "./logger": {
    "production": {
      "types": "./dist/logger/index.d.ts",
      "default": "./dist/logger.js"
    },
    "default": "./lib/logger/index.ts"
  }
}
```

- **`production`**: Used when `NODE_ENV=production`. Resolves to compiled `.js` files and `.d.ts` types in `dist/`.
- **`default`**: Used in development. Resolves directly to the raw TypeScript source (`lib/*.ts` or `src/*.ts`).

**Why this matters:**
This setup allows consumer apps (like `sales-web`) running in Vite development mode to import changes from shared packages *immediately*, without needing to rebuild the shared package after every change.

## 2. Adding New Shared Code

When adding a new shared module:

1. **Create the file** in `lib/` (or `src/` depending on the package).
2. **Export it in `package.json`**: Ensure you add an entry to the `"exports"` block following the pattern above.
3. **Build the package**: Even though dev mode uses the raw source, the `dist/` outputs must be generated for type checking and production builds. Run `pnpm build` in the package root.

## 3. Importing in Consumer Apps

In `apps/sales-web`, always import from the package name and specific export path:

```tsx
// ✅ Correct: Import from specific entry point
import { logger } from '@portfolio/common/logger';
import { paginationDto } from '@portfolio/common/dto/pagination';

// ❌ Incorrect: Do not import from raw relative paths across workspaces
import { logger } from '../../../packages/common/lib/logger';
```

## 4. What Belongs Where?

- **`packages/common`**: Any code that defines the shape of data or business rules used by multiple packages or apps. This is the home for Zod schemas, shared DTO types, global constants, and cross-cutting concerns like logging.
- **`packages/utils`**: Pure utility functions. These functions should have minimal dependencies and ideally no domain-specific knowledge. Use tools like `es-toolkit` under the hood if necessary.
- **`apps/sales-web/src/utils/`**: Utilities specific to the web app frontend that are not reusable elsewhere (e.g., DOM manipulation helpers, React-specific formatters).
