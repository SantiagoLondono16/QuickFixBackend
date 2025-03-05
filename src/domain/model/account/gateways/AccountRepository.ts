import { Nullable } from "@shared/domain/type/Nullable";
import { Account } from "../Account";
import { BaseRepository } from "@shared/domain/repository/BaseRepository";

export interface AccountRepository extends BaseRepository<string, Account> {
  getByEmail(email: string): Promise<Nullable<Account>>;
}

export const AccountRepository = Symbol("AccountRepository");
