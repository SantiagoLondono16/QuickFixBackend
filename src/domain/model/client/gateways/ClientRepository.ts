import { BaseRepository } from "@shared/domain/repository/BaseRepository";
import { Client } from "../Client";
import { Nullable } from "@shared/domain/type/Nullable";

export interface ClientRepository extends BaseRepository<string, Client> {
  findByAccountEmail(email: string): Promise<Nullable<Client>>;
}

export const ClientRepository = Symbol("ClientRepository");
