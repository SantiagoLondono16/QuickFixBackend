import { UserEmail } from "@domain/model/user/value-object/UserEmail";
import { BooleanValueObject } from "@shared/domain/value-object/BooleanValueObject";

export interface UserProps {
  email: UserEmail;
  password: string;
  isActive: BooleanValueObject;
}
