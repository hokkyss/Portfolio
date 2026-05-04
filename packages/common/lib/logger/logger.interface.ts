export interface ILoggerClient {
  debug: (payload: unknown) => void;
  error: (payload: unknown) => void;
  group: (label: string) => void;
  groupEnd: () => void;
  log: (payload: unknown) => void;
  table: <T extends Record<string, unknown>>(
    tabularData: T[],
    properties?: (keyof T)[],
  ) => void;
  trace: (message: string, payload: unknown) => void;
  warn: (payload: unknown) => void;
}
