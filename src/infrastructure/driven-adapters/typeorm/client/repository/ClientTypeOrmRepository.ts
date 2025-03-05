import { AdapterOperations } from "@shared/infrastructure/adapter/typeorm/util/AdapterOperations";
import { ClientEntity } from "../entity/ClientEntity";
import { Client } from "@domain/model/client/Client";
import { ClientMapper } from "../mapper/ClientMapper";
import { ClientRepository } from "@domain/model/client/gateways/ClientRepository";
import { Nullable } from "@shared/domain/type/Nullable";
import { DataSource } from "typeorm";
import { inject, injectable } from "tsyringe";

@injectable()
export class ClientTypeOrmRepository
  extends AdapterOperations<string, ClientEntity, Client>
  implements ClientRepository
{
  constructor(
    @inject(DataSource) readonly datasource: DataSource,
    @inject(ClientMapper) readonly mapper: ClientMapper,
  ) {
    super(datasource, mapper);
  }

  async findByAccountEmail(email: string): Promise<Nullable<Client>> {
    const repository = this.repository();
    const clientEntity = await repository
      .createQueryBuilder("client")
      .innerJoinAndSelect("client.account", "account")
      .where("account.email = :email", { email })
      .getOne();

    return clientEntity ? this.mapper.toDomain(clientEntity) : null;
  }

  protected entitySchema(): new () => ClientEntity {
    return ClientEntity;
  }
}
