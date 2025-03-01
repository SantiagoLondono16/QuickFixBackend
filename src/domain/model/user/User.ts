import { Entity, IDType } from "@shared/domain/entity/Entity";
import { BooleanValueObject } from "@shared/domain/value-object/BooleanValueObject";
import { UserProps } from "./type/UserProps";
import { CreateUserProps } from "./type/CreateUserProps";
import { UserEmail } from "./value-object/UserEmail";
import { v4 as uuid } from "uuid";

export class User extends Entity<UserProps> {
  protected readonly _id: IDType;

  static create(payload: CreateUserProps): User {
    const id = uuid();

    const props: UserProps = {
      email: UserEmail.create(payload.email),
      password: payload.password,
      isActive: new BooleanValueObject(true),
    };

    return new User({ id, props });
  }

  toPrimitive() {
    return {
      id: this.id,
      email: this.props.email.value,
      password: this.props.password,
      isActive: this.props.isActive.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

}
