export type IDType = string | number;

export interface BaseEntityProps {
  id: IDType;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateEntityProps<T> extends BaseEntityProps {
  props: T;
}

export abstract class Entity<EntityProps> {
  protected readonly props: EntityProps;
  protected abstract _id: IDType;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor({
    id,
    createdAt,
    updatedAt,
    props,
  }: CreateEntityProps<EntityProps>) {
    this.setId(id);
    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.props = props;
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  private setId(id: IDType) {
    this._id = id;
  }

  static isEntity(entity: any): boolean {
    return entity instanceof Entity;
  }

  equals(object?: any): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!Entity.isEntity(object)) {
      return false;
    }

    return this.id ? this.id === object.id : false;
  }

  getProps(): EntityProps & BaseEntityProps {
    const copy = {
      id: this._id,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
      ...this.props,
    };
    return Object.freeze(copy);
  }

  abstract toPrimitive(): any;
}
