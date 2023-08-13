# `app/_libs/_client`

`_client` directory is for everything that is only available on client side.

You can freely access objects relating to `document` or `window` inside every `_libs/_client` directory

Some things that could be inside `_client` are:

1. Client Components
2. React Contexts and React Hooks
3. Browser/Client Utilities
4. React-only state managements (like `jotai` or `recoil`)
5. etc

### Conventions

0. It extends `_libs` conventions.
1. `use client` directive must be at the very top of each file.
2. You are recommended to import `client-only` package. This is not enforced though as the reason is simply uniformity.
3. You may only import from another `_client` or `_common`
