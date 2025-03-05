import { Client } from "@domain/model/client/Client";
import { Payment } from "@domain/model/payment/Payment";
import { Worker } from "@domain/model/worker/Worker";
import { Nullable } from "@shared/domain/type/Nullable";
import { ServiceType } from "./CreateService";

export type serviceStatus =
  | "PENDING"
  | "IN_PROCESS"
  | "CANCELLED"
  | "COMPLETED";

export interface ServiceProps {
  client: Client;
  worker: Worker;
  onDate: Date;
  address: string;
  description: string;
  type: ServiceType;
  status: serviceStatus;
  payment: Nullable<Payment>;
}
