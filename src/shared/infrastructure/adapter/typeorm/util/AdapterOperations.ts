import {
  BaseRepository,
  Paginated,
  PaginatedQueryParams,
} from "@shared/domain/repository/BaseRepository";

import { Nullable } from "@shared/domain/type/Nullable";

import {
  DataSource,
  FindOptionsOrder,
  ObjectLiteral,
  Repository,
} from "typeorm";

import { Mapper } from "../../mapper/Mapper";

export abstract class AdapterOperations<I, E extends ObjectLiteral, D>
  implements BaseRepository<I, D>
{
  protected abstract entitySchema(): { new (): E };

  constructor(
    private readonly _client: DataSource,
    protected mapper: Mapper<E, D>,
  ) {}

  protected client(): DataSource {
    return this._client;
  }
  protected repository(): Repository<E> {
    return this._client.getRepository(this.entitySchema());
  }

  async save(entity: D): Promise<void> {
    const repository = this.repository();
    const entry = this.mapper.toEntity(entity);
    await repository.save(entry);
  }

  async findOneById(id: I): Promise<Nullable<D>> {
    const repository = this.repository();
    const entry = await repository.findOneBy({ id } as any);
    return entry ? this.mapper.toDomain(entry) : null;
  }

  async findAll(): Promise<D[]> {
    const repository = this.repository();
    const entries = await repository.find();
    return entries.map(this.mapper.toDomain);
  }

  async findAllPaginated(params: PaginatedQueryParams): Promise<Paginated<D>> {
    const { limit, page, offset, orderBy } = params;

    const order = orderBy
      ? ({ [orderBy.field]: orderBy.param } as FindOptionsOrder<E>)
      : undefined;

    const repository = this.repository();
    const [data, count] = await repository.findAndCount({
      take: limit,
      skip: offset,
      order,
    });
    const domainData = data.map(this.mapper.toDomain);
    return new Paginated<D>({ count, limit, page, data: domainData });
  }

  async delete(entity: D): Promise<boolean> {
    const repository = this.repository();
    const result = await repository.remove(this.mapper.toEntity(entity));
    return !!result;
  }
}
