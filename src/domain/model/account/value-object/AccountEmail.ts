import { ValueObject } from "@shared/domain/value-object/ValueObject";

export class AccountEmail extends ValueObject<string> {
  private static REGEX = /\S+@\S+\.\S+/;

  static create(email: string) {
    if (!AccountEmail.isValidEmail(email)) throw new Error();
    return new AccountEmail(email);
  }

  private static isValidEmail(email: string): boolean {
    return AccountEmail.REGEX.test(email);
  }
}
