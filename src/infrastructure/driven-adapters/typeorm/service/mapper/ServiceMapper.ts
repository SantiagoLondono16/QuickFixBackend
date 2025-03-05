import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { ServiceEntity } from "../entity/ServiceEntity";
import { Service } from "@domain/model/service/Service";
import { ClientMapper } from "../../client/mapper/ClientMapper";
import { WorkerMapper } from "../../worker/mapper/WorkerMapper";
import { ServiceType } from "@domain/model/service/type/CreateService";
import { PaymentMapper } from "../../payment/PaymentMapper";
import { serviceStatus } from "@domain/model/service/type/ServiceProps";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class ServiceMapper implements Mapper<ServiceEntity, Service> {
  constructor(
    @inject(delay(() => ClientMapper))
    private readonly clientMapper: ClientMapper,
    @inject(delay(() => PaymentMapper))
    private readonly paymentMapper: PaymentMapper,
    @inject(delay(() => WorkerMapper))
    private readonly workerMapper: WorkerMapper,
  ) {}

  toDomain(entity: ServiceEntity): Service {
    return new Service({
      id: entity.id,
      props: {
        client: this.clientMapper.toDomain(entity.client),
        worker: this.workerMapper.toDomain(entity.worker),
        onDate: entity.onDate,
        address: entity.address,
        description: entity.description,
        type: entity.type as ServiceType,
        status: entity.status as serviceStatus,
        payment: entity.payment
          ? this.paymentMapper.toDomain(entity.payment)
          : null,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Service): ServiceEntity {
    const copy = domain.getProps();
    const entity = new ServiceEntity();

    entity.id = copy.id.toString();
    entity.client = this.clientMapper.toEntity(copy.client);
    entity.worker = this.workerMapper.toEntity(copy.worker);
    entity.onDate = copy.onDate;
    entity.address = copy.address;
    entity.description = copy.description;
    entity.type = copy.type;
    entity.status = copy.status;
    entity.payment = copy.payment
      ? this.paymentMapper.toEntity(copy.payment)
      : null;
    entity.createdAt = copy.createdAt ?? new Date();
    entity.updatedAt = copy.updatedAt ?? new Date();

    return entity;
  }
}
