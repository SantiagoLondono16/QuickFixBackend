import { injectable, inject } from "tsyringe";
import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { Client } from "@domain/model/client/Client";
import { ClientEntity } from "../entity/ClientEntity";
import { AccountMapper } from "../../account/mapper/AccountMapper";
import { ReviewMapper } from "../../review/mapper/ReviewMapper";
import { ServiceMapper } from "../../service/mapper/ServiceMapper";

@injectable()
export class ClientMapper implements Mapper<ClientEntity, Client> {
  constructor(
    @inject(AccountMapper) private readonly accountMapper: AccountMapper,
    @inject(ServiceMapper) private readonly serviceMapper: ServiceMapper,
    @inject(ReviewMapper) private readonly reviewMapper: ReviewMapper,
  ) {}

  toDomain(entity: ClientEntity): Client {
    return new Client({
      id: entity.id,
      props: {
        name: entity.name,
        account: entity.account
          ? this.accountMapper.toDomain(entity.account)
          : null,
        services: entity.services.map((s) => this.serviceMapper.toDomain(s)),
        reviews: entity.reviews.map((r) => this.reviewMapper.toDomain(r)),
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Client): ClientEntity {
    const props = domain.getProps();
    const entity = new ClientEntity();

    entity.id = props.id.toString();
    entity.name = props.name;
    entity.account = props.account
      ? this.accountMapper.toEntity(props.account)
      : null;
    entity.services = props.services.map((s) => this.serviceMapper.toEntity(s));
    entity.reviews = props.reviews.map((r) => this.reviewMapper.toEntity(r));
    entity.createdAt = props.createdAt ?? new Date();
    entity.updatedAt = props.updatedAt ?? new Date();

    return entity;
  }
}
