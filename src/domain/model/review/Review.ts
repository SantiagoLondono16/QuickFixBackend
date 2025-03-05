import { Entity, IDType } from "@shared/domain/entity/Entity";
import { ReviewProps } from "./type/ReviewProps";
import { v4 as uuid } from "uuid";
export class Review extends Entity<ReviewProps> {
  protected _id: IDType;

  static create(payload: ReviewProps) {
    const id = uuid();
    return new Review({ id, props: payload });
  }

  toPrimitive(): any {
    return {
      id: this.id,
      client: this.props.client.toPrimitive(),
      worker: this.props.worker.toPrimitive(),
      score: this.props.score,
      description: this.props.description,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
