# Portfolio Web Application

A modern, high-performance personal portfolio built with the **TanStack ecosystem**, powered by **Sanity CMS**, and capable of dual-deployment on **Cloudflare** and **Netlify**.

## Features & Technical Highlights

This application is designed to be a showcase for recruiters and a reference for developers interested in modern web architectures.

- **TanStack Ecosystem**: Utilizes [TanStack Start](https://tanstack.com/start) for server-side rendering (SSR) and full-stack React capabilities, [TanStack Router](https://tanstack.com/router) for type-safe routing, and [TanStack Query](https://tanstack.com/query) for efficient data fetching and caching.
- **Sanity CMS Integration**: Dynamic content management through Sanity. *Note: The CMS configuration and studio are managed in a separate private repository*, keeping this frontend repository lightweight and focused purely on presentation.
- **Dual Deployment Strategies**: Configured to be deployable on both **Cloudflare** Workers via `wrangler` and **Netlify**, providing deployment flexibility and leveraging edge computing capabilities.
- **Modern UI & Type Safety**: Built with **React 19**, styled with **Tailwind CSS**, and strictly typed from end-to-end using TypeScript and Zod.
- **Monitoring & Analytics**: Integrated with Sentry for error tracking and Firebase for potential backend utilities or analytics.

## Environment Variables

To run this project locally, you need to configure the following environment variables. Create a `.env` file in the root of this app (`apps/public-tanstack-start`) based on the `.env.example`:

```env
# Google Tag Manager (Optional)
PUBLIC_GTM_ID=

# Sanity CMS Configuration
# You need a Sanity account and an active project to get these values.
CMS_API_VERSION=
CMS_DATASET=
CMS_PROJECT_ID=
CMS_TOKEN=

# Firebase Configuration (Optional)
PUBLIC_FIREBASE_API_KEY=
PUBLIC_FIREBASE_AUTH_DOMAIN=
PUBLIC_FIREBASE_DATABASE_URL=
PUBLIC_FIREBASE_PROJECT_ID=
PUBLIC_FIREBASE_STORAGE_BUCKET=
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
PUBLIC_FIREBASE_APP_ID=
PUBLIC_FIREBASE_MEASUREMENT_ID=

# Sentry Error Tracking (Optional)
SENTRY_AUTH_TOKEN=
SENTRY_ORGANIZATION=
SENTRY_PROJECT=
SENTRY_DSN=

# SEO robots.txt control
# For development environment, this should be `false`
ENABLE_ROBOTS=false
```

## Local Development

Since this project uses a monorepo setup (via `pnpm` workspaces), ensure you install dependencies from the workspace root.

1. **Install Dependencies**
   Navigate to the root of the repository and run:
   ```bash
   pnpm install
   ```

2. **Run the Development Server**
   Navigate back to this app's directory (`apps/public-tanstack-start`) and run:
   ```bash
   pnpm run dev
   ```

3. **Open the App**
   The application should now be running at `http://localhost:3000` (or the port specified by Vite).

## Building for Production

This project supports multiple build targets through Vite plugins and CLI configurations.

- **Standard Build**
  ```bash
  pnpm run build
  ```

- **Cloudflare Build (Production)**
  ```bash
  pnpm run build:cloudflare:prod
  ```

- **Netlify Build**
  ```bash
  pnpm run build:netlify
  ```

## Architecture Notes for Developers

- **Monorepo Structure**: This application relies on shared internal packages defined in the workspace, such as `@portfolio/common`, `@portfolio/design-system`, `@portfolio/seo`, and `@portfolio/utils`.
- **State Management**: Uses a combination of TanStack Query for server state and Zustand for client-side state.
- **Styling**: Tailwind CSS is used extensively for utility-first styling alongside Phosphor Icons for UI elements.
