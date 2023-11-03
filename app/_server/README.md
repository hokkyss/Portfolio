# `app/_server`

`_server` directory is for everything that is only available on server side. Because of it, `_server` cannot and may not be imported from `_client`. Simply put, `_server` is server only code.

Some possible contents of `_server` are:

1. Server Components
2. Firebase Admin (if used)
3. Server Actions
4. etc

### Conventions

1. You use `use server` directive at the very top of every component file
2. You cannot access any objects related to `document` or `window` at all (except `fetch` that is polyfilled by Next.js).
3. You can only import `_common` and `_server` contents. You cannot import any `_client` except Client Components.
4. No interactivity for Server Components. So no `onClick`, `onBlur`, etc. `Server Actions` is an exception.
5. To prevent any poison (`_clients` unintentionally imported `_servers`), import `server-only` package.
