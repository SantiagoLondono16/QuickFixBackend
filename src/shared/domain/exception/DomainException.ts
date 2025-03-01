export abstract class DomainException extends Error {
  constructor(
    readonly message: string,
    readonly code: string,
  ) {
    super(message);
    Object.setPrototypeOf(this, DomainException.prototype);
  }

  static composeMessage(prefix: string, message?: string, code?: string) {
    return message && code ? `${message} [${code}]` : prefix;
  }
}
