import { Entity, IDType } from "@shared/domain/entity/Entity";
import { CertificationProps } from "./type/CertificationProps";
import { v4 as uuid } from "uuid";

export class Certification extends Entity<CertificationProps> {
  protected _id: IDType;

  static create(payload: CertificationProps) {
    const id = uuid();
    return new Certification({ id, props: payload });
  }

  toPrimitive(): any {
    return {
      id: this.id,
      skill: this.props.skill.toPrimitive(),
      name: this.props.name,
      url: this.props.url,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
