import { Worker } from "../Worker";
import { BaseRepository } from "@shared/domain/repository/BaseRepository";

export interface WorkerRepository extends BaseRepository<string, Worker> {}

export const WorkerRepository = Symbol("WorkerRepository");
