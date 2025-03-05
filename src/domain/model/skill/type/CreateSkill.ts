import { Worker } from "@domain/model/worker/Worker";

export interface CreateSkill {
  name: string;
  description: string;
  worker: Worker;
}
