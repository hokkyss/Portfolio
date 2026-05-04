declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly VITE_BASE_API_URL: string;
    }
  }
}

export {};
