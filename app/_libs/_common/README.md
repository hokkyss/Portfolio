# `app/_libs/_common`

`_common` directory is for everything that is usable from both server side and client side. In other words, side-agnostic.

Some possible contents of `_common` are:

1. Firebase client (if used)
2. Data fetching
3. General utility functions
4. Constants
5. Dependency Injections
6. Vanilla-capable state managements (like `zustand` or `valtio`)
7. Environment variables prefixed with `NEXT_PUBLIC`
8. etc

### Conventions

0. It extends `_libs` conventions.
1. You cannot use any directives (defaulted to server side by Next). Next, however, is smart enough to know whether a module is imported in client side, so you don't have to worry about anything.
2. You cannot import either or both of `server-only` and `client-only`
3. You may not access objects related to `document` or `window`. If you want to access `document` or `window`, use `_client` directory instead.
4. You may not access server side features or values exposed only to server side. Environment variables not prefixed with `NEXT_PUBLIC` are only accessible from server side, so access them inside `_server` instead.
5. You can only import `_common` contents.
