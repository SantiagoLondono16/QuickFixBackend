import { Account } from "@domain/model/account/Account";
import { Review } from "@domain/model/review/Review";
import { Service } from "@domain/model/service/Service";
import { Nullable } from "@shared/domain/type/Nullable";

export interface ClientProps {
  name: string;
  services: Service[];
  reviews: Review[];
  account: Nullable<Account>;
}
