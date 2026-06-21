import { Primitive } from '../types';

class ApplicationError extends Error {
  public get payload() {
    return this.internalPayload;
  }

  private readonly internalPayload: Record<string, Primitive>;

  constructor(public readonly status: number, public readonly message: string) {
    super(message);

    this.name = 'ApplicationError';
    this.internalPayload = {};
  }

  public addPayload<T extends Primitive>(key: string, value: T): this;
  public addPayload(key: string, value: Primitive) {
    this.internalPayload[key] = value;

    return this;
  }
}

export default ApplicationError;
