import { Mapper } from "@shared/infrastructure/adapter/mapper/Mapper";
import { Review } from "@domain/model/review/Review";
import { ReviewEntity } from "../entity/ReviewEntity";
import { WorkerMapper } from "../../worker/mapper/WorkerMapper";
import { ClientMapper } from "../../client/mapper/ClientMapper";
import { injectable, inject, delay } from "tsyringe";

@injectable()
export class ReviewMapper implements Mapper<ReviewEntity, Review> {
  constructor(
    @inject(delay(() => ClientMapper))
    private readonly clientMapper: ClientMapper,
    @inject(delay(() => WorkerMapper))
    private readonly workerMapper: WorkerMapper,
  ) {}

  toDomain(entity: ReviewEntity): Review {
    return new Review({
      id: entity.id,
      props: {
        client: this.clientMapper.toDomain(entity.client),
        worker: this.workerMapper.toDomain(entity.worker),
        score: entity.score,
        description: entity.description,
      },
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    });
  }

  toEntity(domain: Review): ReviewEntity {
    const props = domain.getProps();
    const entity = new ReviewEntity();

    entity.id = props.id.toString();
    entity.client = this.clientMapper.toEntity(props.client);
    entity.worker = this.workerMapper.toEntity(props.worker);
    entity.score = props.score;
    entity.description = props.description;
    entity.createdAt = props.createdAt ?? new Date();
    entity.updatedAt = props.updatedAt ?? new Date();

    return entity;
  }
}
