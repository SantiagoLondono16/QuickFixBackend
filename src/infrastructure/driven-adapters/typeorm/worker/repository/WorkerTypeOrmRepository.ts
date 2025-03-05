import { AdapterOperations } from "@shared/infrastructure/adapter/typeorm/util/AdapterOperations";
import { DataSource } from "typeorm";
import { Worker } from "@domain/model/worker/Worker";
import { WorkerEntity } from "../entity/WorkerEntity";
import { WorkerRepository } from "@domain/model/worker/gateways/WorkerRepository";
import { inject, injectable } from "tsyringe";
import { WorkerMapper } from "../mapper/WorkerMapper";

@injectable()
export class WorkerTypeOrmRepository
  extends AdapterOperations<string, WorkerEntity, Worker>
  implements WorkerRepository
{
  constructor(
    @inject(DataSource) readonly datasource: DataSource,
    @inject(WorkerMapper) readonly mapper: WorkerMapper,
  ) {
    super(datasource, mapper);
  }

  protected entitySchema(): new () => WorkerEntity {
    return WorkerEntity;
  }
}
