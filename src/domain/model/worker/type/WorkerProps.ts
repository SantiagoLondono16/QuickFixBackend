import { Account } from "@domain/model/account/Account";
import { Review } from "@domain/model/review/Review";
import { Service } from "@domain/model/service/Service";
import { Skill } from "@domain/model/skill/Skill";
import { Nullable } from "@shared/domain/type/Nullable";

export interface WorkerProps {
  name: string;
  account: Nullable<Account>;
  services: Service[];
  skills: Skill[];
  reviews: Review[];
}
