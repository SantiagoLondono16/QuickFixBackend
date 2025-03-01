import { Nullable } from "@shared/domain/type/Nullable";
import { User } from "../User";

export interface UserRepository {
  save(user: User): Promise<void>;
  all(): Promise<User[]>;
  getByEmail(email: string): Promise<Nullable<User>>;
}
