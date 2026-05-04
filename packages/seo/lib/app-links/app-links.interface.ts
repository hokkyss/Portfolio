export type AppLinks = {
  android?: Array<AppLinksAndroid>;
  ios?: Array<AppLinksApple>;
  ipad?: Array<AppLinksApple>;
  iphone?: Array<AppLinksApple>;
  web?: Array<AppLinksWeb>;
  windows?: Array<AppLinksWindows>;
  windows_phone?: Array<AppLinksWindows>;
  windows_universal?: Array<AppLinksWindows>;
};

type AppLinksAndroid = {
  app_name?: string;
  class?: string;
  package: string;
  url?: string | undefined | URL;
};
type AppLinksApple = {
  app_name?: string;
  app_store_id?: number | string;
  url: string | URL;
};

type AppLinksWeb = {
  should_fallback?: boolean;
  url: string | URL;
};

type AppLinksWindows = {
  app_id?: string;
  app_name?: string;
  url: string | URL;
};
