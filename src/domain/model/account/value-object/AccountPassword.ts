import { ValueObject } from "@shared/domain/value-object/ValueObject";

export class AccountPassword extends ValueObject<string> {
  private static MIN_LENGTH = 8;
  private static REGEX = (length: number) =>
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${length},}$`;

  static isPasswordTooWeak(password: string) {
    const regExp = new RegExp(
      AccountPassword.REGEX(AccountPassword.MIN_LENGTH),
    );
    return !regExp.test(password);
  }

  static create(password: string) {
    if (AccountPassword.isPasswordTooWeak(password)) {
      throw new Error();
    }
    return new AccountPassword(password);
  }
}
