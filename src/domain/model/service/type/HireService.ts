import { paymentType } from "@domain/model/payment/type/PaymentProps";

export interface HireService {
  clientEmail: string;
  workerId: string;
  address: string;
  description: string;
  onDate: Date;
  type: string;
  value: number;
  payment: paymentType;
}
