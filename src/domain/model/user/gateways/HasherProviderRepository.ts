export interface HasherRepository {
  hash(value: string): Promise<string>;
  check(value: string, hashedValue: string): Promise<boolean>;
}
