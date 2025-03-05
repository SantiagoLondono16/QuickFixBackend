import { Entity, IDType } from "@shared/domain/entity/Entity";
import { WorkerProps } from "./type/WorkerProps";
import { CreateWorker } from "./type/CreateWorker";
import { v4 as uuid } from "uuid";

export class Worker extends Entity<WorkerProps> {
  protected _id: IDType;

  static create(payload: CreateWorker) {
    const id = uuid();
    const props = {
      ...payload,
      account: null,
      services: [],
      skills: [],
      reviews: [],
    };
    return new Worker({ id, props });
  }

  toPrimitive() {
    return {
      id: this.id,
      name: this.props.name,
      account: this.props.account ? this.props.account.toPrimitive() : null,
      services: this.props.services.map((s) => s.toPrimitive()),
      skills: this.props.skills.map((sk) => sk.toPrimitive()),
      reviews: this.props.reviews.map((r) => r.toPrimitive()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
