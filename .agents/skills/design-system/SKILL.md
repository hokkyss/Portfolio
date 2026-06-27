---
name: design-system
description: >
  Teaches the agent how to correctly use @portfolio/design-system — the
  project-local shadcn/ui component library. Auto-activates when writing
  code that imports from @portfolio/design-system, when asked to add new
  components to the design-system, or when asked to rebuild it.
user-invocable: false
allowed-tools: Bash(pnpm *)
---

# @portfolio/design-system

A project-local shadcn/ui component library in `packages/design-system`.
Every shadcn component is re-exported as its own named path (e.g. `@portfolio/design-system/button`).

> **IMPORTANT:** The existing `shadcn` skill covers composition rules, variants, form patterns, and the shadcn CLI.
> This skill only covers what is **unique to this monorepo**: import conventions, CSS wiring, the shadcn-add workflow inside the package, and the build workflow.

---

## 1. Import Pattern — Granular Per-Export

Each component has **its own export path**. Always import each component individually from its own path.

```tsx
// ✅ Correct — one import per component, each from its own path
import Button from '@portfolio/design-system/button';
import Card from '@portfolio/design-system/card';
import Field from '@portfolio/design-system/field';
import FieldGroup from '@portfolio/design-system/field-group';
import FieldLabel from '@portfolio/design-system/field-label';
import FieldError from '@portfolio/design-system/field-error';
import Input from '@portfolio/design-system/input';
import Select from '@portfolio/design-system/select';
import SelectContent from '@portfolio/design-system/select-content';
import SelectItem from '@portfolio/design-system/select-item';
import SelectTrigger from '@portfolio/design-system/select-trigger';
import SelectValue from '@portfolio/design-system/select-value';

// ❌ Wrong — barrel/index imports do not exist
import { Button, Card } from '@portfolio/design-system';
import Button from '@portfolio/design-system/index';
```

All exports are **default exports**, not named exports. The default export name
should match the component (e.g. `import Button from '...'`, not `import { Button } from '...'`).

---

## 2. CSS Setup

The design-system ships a single CSS file that must be imported **once** in the consumer app's root stylesheet. The `source(none)` flag is required to prevent Tailwind from scanning the package's source files.

```css
/* apps/sales-web/src/styles.css — already set up, do NOT duplicate */
@import "@portfolio/design-system/index.css" source(none);
```

> **Do not** add this import anywhere else. One import at the app root is enough.
> If you are creating a **new consumer app** in this monorepo, add this single line to its root CSS file.

The `index.css` includes:
- Tailwind v4 base styles (`@import "tailwindcss"`)
- CSS custom properties (light + dark theme tokens)
- `--font-sans: "Inter Variable"`, `--font-heading: "Roboto Variable"`
- `@theme inline` block with all color/radius/font token mappings
- Smooth transition base styles for colors and borders

### Overriding vs Extending

When building UIs with the design system:
- **Do NOT** heavily override component styles using the `className` prop (e.g. `<Button className="bg-red-500 hover:bg-red-600 text-white rounded-full">`).
- **DO** use the built-in variants defined in the components (e.g. `<Button variant="destructive" size="lg">`).
- If a variant is missing and needed across multiple apps, edit the component inside `packages/design-system/lib/components/ui/` and rebuild the package.

---

## 3. Adding New Components to the Design-System

When a component that does not yet exist in `@portfolio/design-system` needs to be added,
use the `shadcn:add` script defined in `packages/design-system/package.json`.

### Step-by-step workflow

**Step 1 — Add the component via the monorepo filter:**
```bash
# From the repo root
pnpm --filter @portfolio/design-system shadcn:add <component-name>
# Example:
pnpm --filter @portfolio/design-system shadcn:add combobox
pnpm --filter @portfolio/design-system shadcn:add dialog
```

This runs `pnpm exec shadcn add <component>` inside `packages/design-system/`, which:
- Installs the component files into `packages/design-system/lib/components/ui/`
- Uses the project's `components.json` (style: `base-nova`, icon library: `phosphor`)

**Step 2 — Create the src entry file(s):**

After shadcn adds the component, you must create a thin re-export file in `packages/design-system/src/<component-name>/`.
The Vite build discovers entries by scanning `src/` recursively.

```ts
// packages/design-system/src/dialog/dialog.ts
import { Dialog } from '@/components/ui/dialog';
export default Dialog;

// packages/design-system/src/dialog/dialog-content.tsx
import { DialogContent } from '@/components/ui/dialog';
export default DialogContent;

// packages/design-system/src/dialog/dialog-title.tsx
import { DialogTitle } from '@/components/ui/dialog';
export default DialogTitle;
```

Follow the existing pattern:
- One file per exported sub-component
- File extension is `.ts` for components with no JSX, `.tsx` for those that use JSX directly
- Import from the internal shadcn path `@/components/ui/<name>`
- Export as `export default`

**Step 3 — Rebuild** (see Section 4)

**Step 4 — Verify exports were added to `package.json`:**

After rebuilding, check that `packages/design-system/package.json` contains the new entries under `exports`:
```json
"./dialog": {
  "types": "./dist/src/dialog/dialog.d.ts",
  "default": "./dist/dialog.js"
},
"./dialog-content": {
  "types": "./dist/src/dialog/dialog-content.d.ts",
  "default": "./dist/dialog-content.js"
}
```

> The `packageJsonExportsPlugin` in `vite.config.ts` **automatically generates** these exports during build. You do not need to edit `package.json` manually.

---

## 4. Build Workflow

The design-system must be rebuilt whenever:
- A new component is added (via `shadcn:add` + src entry files)
- An existing component's source is modified
- A dependency version changes

```bash
# Rebuild the design-system from the monorepo root
pnpm --filter @portfolio/design-system build
```

What this does:
1. Runs `tsc` for type checking
2. Runs Vite build — scans `src/` for all entry files, compiles to `dist/`
3. `vite-plugin-dts` generates `.d.ts` type declaration files
4. `packageJsonExportsPlugin` regenerates the `exports` field in `package.json`

After rebuilding, consumer apps pick up the changes automatically (they resolve to `dist/` files when `NODE_ENV=production`, or source `.ts` files directly in dev mode via the `default` condition).

> **Dev mode caveat:** The `package.json` exports use a `"production"` condition for compiled output and a `"default"` condition pointing to the raw `.ts` source. In development (no `NODE_ENV=production`), Vite resolves directly to source. This means consumer apps in dev mode do NOT require a rebuild after changes — but the `package.json` exports field still needs rebuilding when new entry points are added.

---

## 5. Component Catalog

All available `@portfolio/design-system/*` import paths, grouped by category.

> **Note:** Composition rules for these components (correct nesting, variants, accessibility) are covered in the `shadcn` skill. This catalog only lists what's available.

### Accordion
`accordion`, `accordion-content`, `accordion-item`, `accordion-trigger`

### Alert Dialog
`alert-dialog`, `alert-dialog-action`, `alert-dialog-cancel`, `alert-dialog-content`, `alert-dialog-description`, `alert-dialog-footer`, `alert-dialog-header`, `alert-dialog-title`, `alert-dialog-trigger`

### Application Theme
`application-theme-provider`, `is-valid-application-theme`, `use-application-theme`

### Avatar
`avatar`, `avatar-badge`, `avatar-fallback`, `avatar-group`, `avatar-group-count`, `avatar-image`

### Badge
`badge`

### Button
`button`

### Card
`card`, `card-action`, `card-content`, `card-description`, `card-footer`, `card-header`, `card-title`

### Chart
`chart-container`, `chart-legend`, `chart-legend-content`, `chart-style`, `chart-tooltip`, `chart-tooltip-content`

### Checkbox
`checkbox`

### Dropdown Menu
`dropdown-menu`, `dropdown-menu-checkbox-item`, `dropdown-menu-content`, `dropdown-menu-group`, `dropdown-menu-item`, `dropdown-menu-label`, `dropdown-menu-portal`, `dropdown-menu-radio-group`, `dropdown-menu-radio-item`, `dropdown-menu-separator`, `dropdown-menu-shortcut`, `dropdown-menu-sub`, `dropdown-menu-sub-content`, `dropdown-menu-sub-trigger`, `dropdown-menu-trigger`

### Empty State
`empty`, `empty-content`, `empty-description`, `empty-header`, `empty-media`, `empty-title`

### Field (Form Layout)
`field`, `field-content`, `field-description`, `field-error`, `field-group`, `field-label`, `field-legend`, `field-separator`, `field-set`, `field-title`

### Input
`input`

### Input Group
`input-group`, `input-group-addon`, `input-group-button`, `input-group-input`, `input-group-text`, `input-group-textarea`

### Label
`label`

### Navigation Menu
`navigation-menu`, `navigation-menu-content`, `navigation-menu-indicator`, `navigation-menu-item`, `navigation-menu-link`, `navigation-menu-list`, `navigation-menu-trigger`

### Scroll Area
`scroll-area`, `scroll-bar`

### Select
`select`, `select-content`, `select-group`, `select-item`, `select-label`, `select-scroll-down-button`, `select-scroll-up-button`, `select-separator`, `select-trigger`, `select-value`

### Separator
`separator`

### Sidebar
`sidebar`, `sidebar-content`, `sidebar-footer`, `sidebar-group`, `sidebar-group-action`, `sidebar-group-content`, `sidebar-group-label`, `sidebar-header`, `sidebar-input`, `sidebar-inset`, `sidebar-menu`, `sidebar-menu-action`, `sidebar-menu-badge`, `sidebar-menu-button`, `sidebar-menu-item`, `sidebar-menu-skeleton`, `sidebar-menu-sub`, `sidebar-menu-sub-button`, `sidebar-menu-sub-item`, `sidebar-provider`, `sidebar-rail`, `sidebar-separator`, `sidebar-trigger`, `use-sidebar`

### Switch
`switch`

### Table
`table`, `table-body`, `table-caption`, `table-cell`, `table-footer`, `table-head`, `table-header`, `table-row`

### Textarea
`textarea`

### Toast
`toast`, `toaster`

### Toggle
`toggle`, `toggle-group`, `toggle-group-item`

### Tooltip
`tooltip`, `tooltip-content`, `tooltip-provider`, `tooltip-trigger`

### Utilities
`cn` — the `cn()` class merging utility (clsx + tailwind-merge)
`tw` — the `tw` tagged template literal utility for Tailwind class strings
