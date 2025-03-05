import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { WorkerEntity } from "../entity/WorkerEntity";
import { Worker } from "@domain/model/worker/Worker";
import { SkillMapper } from "../../skill/mapper/SkillMapper";
import { AccountMapper } from "../../account/mapper/AccountMapper";
import { ReviewMapper } from "../../review/mapper/ReviewMapper";
import { ServiceMapper } from "../../service/mapper/ServiceMapper";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class WorkerMapper implements Mapper<WorkerEntity, Worker> {
  constructor(
    @inject(delay(() => AccountMapper))
    private readonly accountMapper: AccountMapper,
    @inject(delay(() => ServiceMapper))
    private readonly serviceMapper: ServiceMapper,
    @inject(delay(() => SkillMapper)) private readonly skillMapper: SkillMapper,
    @inject(delay(() => ReviewMapper))
    private readonly reviewMapper: ReviewMapper,
  ) {}

  toDomain(entity: WorkerEntity): Worker {
    return new Worker({
      id: entity.id,
      props: {
        name: entity.name,
        account: entity.account
          ? this.accountMapper.toDomain(entity.account)
          : null,
        services: entity.services.map((service) =>
          this.serviceMapper.toDomain(service),
        ),
        skills: entity.skills.map((skill) => this.skillMapper.toDomain(skill)),
        reviews: entity.reviews.map((review) =>
          this.reviewMapper.toDomain(review),
        ),
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Worker): WorkerEntity {
    const props = domain.getProps();
    const entity = new WorkerEntity();
    const today = new Date();

    entity.id = props.id.toString();
    entity.name = props.name;
    entity.account = props.account
      ? this.accountMapper.toEntity(props.account)
      : undefined;
    entity.services = props.services.map((service) =>
      this.serviceMapper.toEntity(service),
    );
    entity.skills = props.skills.map((skill) =>
      this.skillMapper.toEntity(skill),
    );
    entity.reviews = props.reviews.map((review) =>
      this.reviewMapper.toEntity(review),
    );
    entity.createdAt = props.createdAt ?? today;
    entity.updatedAt = props.updatedAt ?? today;

    return entity;
  }
}
