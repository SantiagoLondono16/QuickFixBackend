import { AccountRepository } from "@domain/model/account/gateways/AccountRepository";
import { AccountEntity } from "../entity/AccountEntity";
import { Account } from "@domain/model/account/Account";
import { Nullable } from "@shared/domain/type/Nullable";
import { AccountMapper } from "../mapper/AccountMapper";
import { DataSource } from "typeorm";
import { AdapterOperations } from "@shared/infrastructure/adapter/typeorm/util/AdapterOperations";
import { inject, injectable } from "tsyringe";

@injectable()
export class AccountTypeOrmRepository
  extends AdapterOperations<string, AccountEntity, Account>
  implements AccountRepository
{
  constructor(
    @inject(DataSource) datasource: DataSource,
    @inject(AccountMapper) mapper: AccountMapper,
  ) {
    super(datasource, mapper);
  }

  protected entitySchema(): new () => AccountEntity {
    return AccountEntity;
  }

  async getByEmail(email: string): Promise<Nullable<Account>> {
    const repository = this.repository();
    const entry = await repository.findOneBy({ email });
    return entry ? this.mapper.toDomain(entry) : null;
  }
}
