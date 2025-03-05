import { injectable, inject, delay } from "tsyringe";
import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { Payment } from "@domain/model/payment/Payment";
import { PaymentEntity } from "./entity/PaymentEntity";
import { ServiceMapper } from "../service/mapper/ServiceMapper";
import { paymentType } from "@domain/model/payment/type/PaymentProps";

@injectable()
export class PaymentMapper implements Mapper<PaymentEntity, Payment> {
  constructor(
    @inject(delay(() => ServiceMapper))
    private readonly serviceMapper: ServiceMapper,
  ) {}

  toDomain(entity: PaymentEntity): Payment {
    return new Payment({
      id: entity.id,
      props: {
        value: entity.value,
        type: entity.type as paymentType,
        service: this.serviceMapper.toDomain(entity.service),
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Payment): PaymentEntity {
    const copy = domain.getProps();
    const entity = new PaymentEntity();
    const today = new Date();

    entity.id = copy.id.toString();
    entity.value = copy.value;
    entity.type = copy.type;
    entity.service = this.serviceMapper.toEntity(copy.service);
    entity.createdAt = copy.createdAt ?? today;
    entity.updatedAt = copy.updatedAt ?? today;

    return entity;
  }
}
