# `app/_libs`

### What is `_libs` directory?

`_libs` directory is for everything outside of the page:

1. Components
2. Hooks
3. Utilities
4. Data fetching functions
5. Models
6. etc

<strong>Everything</strong> means everything. All functions, values, schemas, endpoints, hooks, components, etc that you use in the `page` must be written inside `_libs` directory.

### `_libs` and their correlation with routes

Each Route must provide their own `_libs` directory

It is important to make sure that `_libs` for each route <strong>only</strong> contains what is only used by the route.

If multiple routes have the same logic, you should judge which route it should be defined in based on <strong>conventions</strong> below. Every other route using the same logic must then import it.

### Contents

There are three main folders inside `_libs` directory:

1. [`_client`](./_client/README.md)
2. [`_common`](./_common/README.md)
3. [`_server`](./_server/README.md)

You may add more folders, but be sure to make conventions with the folders. At the very least, it should follow conventions below.

### Conventions

1. All folders must follow Next private folder naming convention (prefixing the folder with `_`).
2. All folders and files follows `kebab-case` naming convention, e.g. `_rest-api/` and `login-form.tsx`.
