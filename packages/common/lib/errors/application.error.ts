export type ErrorPayloadValue = {
  [key: string]: ErrorPayloadValue;
} | boolean | ErrorPayloadValue[] | null | number | string | undefined;

class ApplicationError extends Error {
  public get payload() {
    return this.internalPayload;
  }

  private readonly internalPayload: Record<string, ErrorPayloadValue>;

  constructor(public readonly status: number, public readonly message: string) {
    super(message);

    this.name = 'ApplicationError';
    this.internalPayload = {};
  }

  public addPayload<T extends ErrorPayloadValue>(key: string, value: T): this;
  public addPayload(key: string, value: ErrorPayloadValue) {
    this.internalPayload[key] = value;

    return this;
  }
}

export default ApplicationError;
