import { ValueObject } from "src/shared/domain/value-object/ValueObject";

export class UserEmail extends ValueObject<string> {
  private static REGEX = /\S+@\S+\.\S+/;

  static create(email: string) {
    if (!UserEmail.isValidEmail(email)) throw new Error();
    return new UserEmail(email);
  }

  private static isValidEmail(email: string): boolean {
    return UserEmail.REGEX.test(email);
  }
}
