# `app/_libs/_server`

`_server` directory is for everything that is only available on server side. Because of it, `_server` cannot and may not be imported from `_client`. Simply put, `_server` is server only code.

Some possible contents of `_server` are:

1. Server Components
2. Firebase Admin (if used)
3. Server Actions
4. etc

### Conventions

0. It extends `_libs` conventions.
1. You cannot use any directives (defaulted by Next to server-side). You can optionally use `use server` directive. (just for uniformity)
2. You cannot access any objects related to `document` or `window` at all.
3. You can only import `_common` and `_server` contents.
4. No interactivity for Server Components. So no `onClick`, `onBlur`, etc. `Server Actions` is an exception.
5. To prevent any poison (`_clients` unintentionally imported `_servers`), import `server-only` package.
