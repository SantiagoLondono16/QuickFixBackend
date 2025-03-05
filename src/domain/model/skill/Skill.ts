import { Entity, IDType } from "@shared/domain/entity/Entity";
import { SkillProps } from "./type/SkillProps";
import { v4 as uuid } from "uuid";
import { CreateSkill } from "./type/CreateSkill";

export class Skill extends Entity<SkillProps> {
  protected _id: IDType;

  static create(payload: CreateSkill) {
    const id = uuid();
    const props = { ...payload, certifications: [] };
    return new Skill({ id, props });
  }

  toPrimitive(): any {
    return {
      id: this.id,
      name: this.props.name,
      description: this.props.description,
      worker: this.props.worker.toPrimitive(),
      certifications: this.props.certifications.map((c) => c.toPrimitive()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
