import { Entity, IDType } from "@shared/domain/entity/Entity";
import { PaymentProps } from "./type/PaymentProps";
import { v4 as uuid } from "uuid";

export class Payment extends Entity<PaymentProps> {
  protected _id: IDType;

  static create(payload: PaymentProps) {
    const id = uuid();
    const props: PaymentProps = payload;
    return new Payment({ id, props });
  }

  toPrimitive() {
    return {
      id: this.id,
      value: this.props.value,
      type: this.props.type,
      service: this.props.service.toPrimitive(),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
