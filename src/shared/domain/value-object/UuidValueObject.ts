import { ValueObject } from "./ValueObject";

export class UuidValueObject extends ValueObject<string> {
  private static readonly REGEX =
    /^[0-9A-F]{8}-[0-9A-F]{4}-[4][0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i;

  private static isValidUUID(uuid: string) {
    return UuidValueObject.REGEX.test(uuid);
  }

  static create(uuid: string) {
    if (!this.isValidUUID(uuid)) {
      throw new Error("Invalid UUID");
    }
    return new UuidValueObject(uuid);
  }
}
