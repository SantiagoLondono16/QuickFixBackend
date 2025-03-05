import { Account } from "@domain/model/account/Account";
import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { AccountEntity } from "../entity/AccountEntity";
import { AccountEmail } from "@domain/model/account/value-object/AccountEmail";
import { BooleanValueObject } from "@shared/domain/value-object/BooleanValueObject";
import { accountRol } from "@domain/model/account/type/AccountProps";

export class AccountMapper implements Mapper<AccountEntity, Account> {
  toDomain(entity: AccountEntity): Account {
    return new Account({
      id: entity.id,
      props: {
        email: AccountEmail.create(entity.email),
        password: entity.password,
        isActive: new BooleanValueObject(entity.isActive),
        rol: entity.rol as accountRol,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Account): AccountEntity {
    const props = domain.toPrimitive();
    const entity = new AccountEntity();

    entity.id = props.id.toString();
    entity.email = props.email;
    entity.password = props.password;
    entity.isActive = props.isActive;
    entity.rol = props.rol;
    entity.createdAt = props.createdAt;
    entity.updatedAt = props.updatedAt;

    return entity;
  }
}
