declare namespace NodeJS {
  interface ProcessEnv {
    readonly CMS_API_VERSION: string;
    readonly CMS_DATASET: string;
    readonly CMS_PROJECT_ID: string;
  }
}
