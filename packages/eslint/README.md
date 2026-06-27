# @portfolio/eslint

Shared ESLint configuration for the Portfolio monorepo.

## Overview

This package provides a unified, shared ESLint configuration to enforce consistent code style and quality across all workspace packages and apps.

It leverages the ESLint flat config system and includes configurations for TypeScript, React, TanStack Query/Router, and more.

## Usage

In your package's `eslint.config.js`:

```javascript
import getConfig from '@portfolio/eslint';

export default getConfig({
  // your custom options and overrides
});
```
