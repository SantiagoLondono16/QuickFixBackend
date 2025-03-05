import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { CertificationEntity } from "../entity/CertificationEntity";
import { Certification } from "@domain/model/certification/Certification";
import { SkillMapper } from "../../skill/mapper/SkillMapper";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class CertificationMapper
  implements Mapper<CertificationEntity, Certification>
{
  constructor(
    @inject(delay(() => SkillMapper)) private readonly skillMapper: SkillMapper,
  ) {}

  toDomain(entity: CertificationEntity): Certification {
    return new Certification({
      id: entity.id,
      props: {
        skill: this.skillMapper.toDomain(entity.skill),
        name: entity.name,
        url: entity.url,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Certification): CertificationEntity {
    const props = domain.getProps();
    const entity = new CertificationEntity();

    entity.id = props.id.toString();
    entity.skill = this.skillMapper.toEntity(props.skill);
    entity.name = props.name;
    entity.url = props.url;
    entity.createdAt = props.createdAt ?? new Date();
    entity.updatedAt = props.updatedAt ?? new Date();

    return entity;
  }
}
