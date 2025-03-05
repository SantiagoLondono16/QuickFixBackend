import { Entity, IDType } from "@shared/domain/entity/Entity";
import { ClientProps } from "./type/ClientProps";
import { CreateClient } from "./type/CreateClient";
import { Account } from "../account/Account";
import { Service } from "../service/Service";
import { CreateService } from "../service/type/CreateService";
import { paymentType } from "../payment/type/PaymentProps";
import { accountRol } from "../account/type/AccountProps";
import { v4 as uuid } from "uuid";

export class Client extends Entity<ClientProps> {
  protected _id: IDType;

  static create(payload: CreateClient) {
    const id = uuid();
    const props: ClientProps = {
      ...payload,
      reviews: [],
      services: [],
      account: null,
    };
    return new Client({ id, props });
  }

  addAccount(email: string, password: string, rol: accountRol) {
    const account = Account.create({ email, password, rol });
    this.props.account = account;
  }

  addService(
    payload: Omit<CreateService, "client"> & {
      value: number;
      paymentType: paymentType;
    },
  ) {
    const service = Service.create({ ...payload, client: this });
    service.addPayment(payload.value, payload.paymentType);
    this.props.services.push(service);
    return service;
  }

  toPrimitive(): any {
    return {
      id: this.id,
      name: this.props.name,
      services: this.props.services.map((service) => service.toPrimitive()),
      account: this.props.account ? this.props.account.toPrimitive() : null,
    };
  }
}
