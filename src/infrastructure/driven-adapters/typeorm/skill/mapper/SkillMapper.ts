import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { SkillEntity } from "../entity/SkillEntity";
import { Skill } from "@domain/model/skill/Skill";
import { WorkerMapper } from "../../worker/mapper/WorkerMapper";
import { CertificationMapper } from "../../certification/mapper/CertificationMapper";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class SkillMapper implements Mapper<SkillEntity, Skill> {
  constructor(
    @inject(delay(() => WorkerMapper))
    private readonly workerMapper: WorkerMapper,
    @inject(delay(() => CertificationMapper))
    private readonly certificationMapper: CertificationMapper,
  ) {}

  toDomain(entity: SkillEntity): Skill {
    return new Skill({
      id: entity.id,
      props: {
        name: entity.name,
        description: entity.description,
        worker: this.workerMapper.toDomain(entity.worker),
        certifications: entity.certifications.map((c) =>
          this.certificationMapper.toDomain(c),
        ),
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Skill): SkillEntity {
    const props = domain.getProps();
    const entity = new SkillEntity();

    entity.id = props.id.toString();
    entity.worker = this.workerMapper.toEntity(props.worker);
    entity.name = props.name;
    entity.description = props.description;
    entity.certifications = props.certifications.map((c) =>
      this.certificationMapper.toEntity(c),
    );
    entity.createdAt = props.createdAt ?? new Date();
    entity.updatedAt = props.updatedAt ?? new Date();

    return entity;
  }
}
