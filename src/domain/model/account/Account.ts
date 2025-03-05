import { Entity, IDType } from "@shared/domain/entity/Entity";
import { BooleanValueObject } from "@shared/domain/value-object/BooleanValueObject";
import { AccountProps } from "./type/AccountProps";
import { AccountEmail } from "./value-object/AccountEmail";
import { CreateAccount } from "./type/CreateAccount";
import { v4 as uuid } from "uuid";

export class Account extends Entity<AccountProps> {
  protected readonly _id: IDType;

  static create(payload: CreateAccount): Account {
    const id = uuid();

    const props: AccountProps = {
      email: AccountEmail.create(payload.email),
      password: payload.password,
      isActive: new BooleanValueObject(true),
      rol: payload.rol,
    };

    return new Account({ id, props });
  }

  toPrimitive(): any {
    return {
      id: this.id,
      email: this.props.email.value,
      password: this.props.password,
      isActive: this.props.isActive.value,
      rol: this.props.rol,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
