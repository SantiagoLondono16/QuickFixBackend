import { AccountEmail } from "@domain/model/account/value-object/AccountEmail";
import { BooleanValueObject } from "@shared/domain/value-object/BooleanValueObject";

export type accountRol = "CLIENT" | "WORKER";

export interface AccountProps {
  email: AccountEmail;
  password: string;
  isActive: BooleanValueObject;
  rol: accountRol;
}
