import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientEntity } from "../../client/entity/ClientEntity";
import { WorkerEntity } from "../../worker/entity/WorkerEntity";

@Entity("reviews")
export class ReviewEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ClientEntity, (client) => client.reviews, {
    nullable: false,
    onDelete: "CASCADE",
  })
  client: ClientEntity;

  @ManyToOne(() => WorkerEntity, (worker) => worker.reviews, {
    nullable: false,
    onDelete: "CASCADE",
  })
  worker: WorkerEntity;

  @Column({ type: "int", width: 1 })
  score: number;

  @Column({ type: "text" })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
