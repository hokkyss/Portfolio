export interface ILoggerClient {
  debug: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  group: (label: string) => void;
  groupEnd: () => void;
  log: (...args: unknown[]) => void;
  table: <T extends Record<string, unknown>>(
    tabularData: T[],
    properties?: (keyof T)[],
  ) => void;
  trace: (message: string, ...args: unknown[]) => void;
  warn: (...args: unknown[]) => void;
}
