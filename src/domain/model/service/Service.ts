import { Entity, IDType } from "@shared/domain/entity/Entity";
import { ServiceProps } from "./type/ServiceProps";
import { CreateService } from "./type/CreateService";
import { Payment } from "../payment/Payment";
import { paymentType } from "../payment/type/PaymentProps";
import { v4 as uuid } from "uuid";

export class Service extends Entity<ServiceProps> {
  protected _id: IDType;

  static create(payload: CreateService) {
    const id = uuid();
    const props: ServiceProps = {
      ...payload,
      status: "PENDING",
      payment: null,
    };
    return new Service({ id, props });
  }

  addPayment(value: number, paymentType: paymentType) {
    const paymentMethod = Payment.create({
      value,
      service: this,
      type: paymentType,
    });

    this.props.payment = paymentMethod;
  }

  toPrimitive(): any {
    return {
      id: this.id,
      client: this.props.client.toPrimitive(),
      worker: this.props.worker.toPrimitive(),
      payment: this.props.payment?.toPrimitive(),
      address: this.props.address,
      type: this.props.type.toString(),
      status: this.props.status,
      onDate: this.props.onDate,
      description: this.props.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
