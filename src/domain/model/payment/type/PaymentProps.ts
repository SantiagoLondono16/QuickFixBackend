import { Service } from "@domain/model/service/Service";

export type paymentType = "CARD" | "CASH";

export interface PaymentProps {
  value: number;
  type: paymentType;
  service: Service;
}
