import { DomainException } from "./DomainException";

export class InvalidArgumentException extends DomainException {
  static readonly PREFIX = "The value is not valid";

  constructor(
    readonly message: string,
    readonly code: string,
  ) {
    super(
      DomainException.composeMessage(
        InvalidArgumentException.PREFIX,
        message,
        code,
      ),
      code,
    );
  }
}
