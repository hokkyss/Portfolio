class ApplicationError extends Error {
  public get payload() {
    return this.internalPayload;
  }

  private readonly internalPayload: Record<string, unknown>;

  constructor(public readonly status: number, public readonly message: string) {
    super(message);

    this.name = 'ApplicationError';
    this.internalPayload = {};
  }

  public addPayload<T>(key: string, value: T): this;
  public addPayload<T>(key: string, reducer: (prev: null | T) => null | T): this;
  public addPayload(key: string, value: unknown) {
    if (typeof value === 'function') {
      this.internalPayload[key] = (value as (prev: unknown) => unknown)(this.internalPayload[key] ?? null);
    } else {
      this.internalPayload[key] = value;
    }

    return this;
  }
}

export default ApplicationError;
