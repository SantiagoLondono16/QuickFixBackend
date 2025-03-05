export interface Mapper<E, D> {
  toDomain(entity: E): D;
  toEntity(domain: D): E;
}
