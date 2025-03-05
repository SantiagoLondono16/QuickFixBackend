import { Client } from "@domain/model/client/Client";
import { Worker } from "@domain/model/worker/Worker";

export enum ServiceType {
  PLUMBING = "Plumbing",
  ELECTRICAL = "Electrical",
  CARPENTRY = "Carpentry",
  PAINTING = "Painting",
  CLEANING = "Cleaning",
  APPLIANCE_REPAIR = "Appliance Repair",
  HVAC = "HVAC (Heating, Ventilation, and Air Conditioning)",
  LOCKSMITH = "Locksmith",
  PEST_CONTROL = "Pest Control",
  GARDENING = "Gardening",
  MOVING = "Moving",
  GENERAL_MAINTENANCE = "General Maintenance",
}

export interface CreateService {
  client: Client;
  worker: Worker;
  address: string;
  description: string;
  type: ServiceType;
  onDate: Date;
}
