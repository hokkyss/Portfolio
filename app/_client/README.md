# `app/_client`

`_client` directory is for everything that is only available on client side.

You can freely access objects relating to `document` or `window` inside every `_libs/_client` directory

Some things that could be inside `_client` are:

1. Client Components
2. React Contexts and React Hooks
3. Browser/Client Utilities
4. React state managements (like `jotai` or `recoil`)
5. etc

### Conventions

1. `use client` directive must be at the very top of each component file.
2. Import `client-only` to prevent poisoning.
3. You may only import from another `_client` or `_common`.
4. Client Components cannot import Server Components.
