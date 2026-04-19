class ApplicationError extends Error {
  constructor(public readonly status: number, public readonly message: string) {
    super(message);

    this.name = 'ApplicationError';
  }
}

export default ApplicationError;
