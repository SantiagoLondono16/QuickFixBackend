import { ValueObject } from "@shared/domain/value-object/ValueObject";

export class UserPassword extends ValueObject<string> {
  private static MIN_LENGTH = 8;
  private static REGEX = (length: number) =>
    `^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{${length},}$`;

  static isPasswordTooWeak(password: string) {
    const regExp = new RegExp(UserPassword.REGEX(UserPassword.MIN_LENGTH));
    return !regExp.test(password);
  }

  static create(password: string) {
    if (UserPassword.isPasswordTooWeak(password)) {
      throw new Error();
    }
    return new UserPassword(password);
  }
}
