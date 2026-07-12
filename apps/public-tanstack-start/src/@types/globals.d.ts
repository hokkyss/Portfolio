declare global {
  const __APP_VERSION__: string;
  const __BUILD_NUMBER__: string;
  const __CLOUDFLARE__: boolean;
  const __NETLIFY__: boolean;

  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export { };
