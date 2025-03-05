import { Client } from "@domain/model/client/Client";
import { Worker } from "@domain/model/worker/Worker";

export interface ReviewProps {
  client: Client;
  worker: Worker;
  score: number;
  description: string;
}
