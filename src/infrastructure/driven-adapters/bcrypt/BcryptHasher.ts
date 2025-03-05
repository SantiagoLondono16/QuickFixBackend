import { HasherRepository } from "@domain/model/account/gateways/HasherProviderRepository";
import bcrypt from "bcrypt";

export class BcryptHasher implements HasherRepository {
  private static SALT = 10;

  hash(value: string): Promise<string> {
    return bcrypt.hash(value, BcryptHasher.SALT);
  }

  check(value: string, hashedValue: string): Promise<boolean> {
    return bcrypt.compare(value, hashedValue);
  }
}
