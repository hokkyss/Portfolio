declare namespace NodeJS {
  interface ProcessEnv {
    readonly CMS_API_VERSION: string;
    readonly CMS_DATASET: string;
    readonly CMS_PROJECT_ID: string;
    readonly CMS_TOKEN: string;
    readonly NEXT_PUBLIC_DOMAIN: string;
    readonly NEXT_PUBLIC_GTM_ID: string;
  }
}
