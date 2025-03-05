import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClientEntity } from "../../client/entity/ClientEntity";
import { WorkerEntity } from "../../worker/entity/WorkerEntity";
import { PaymentEntity } from "../../payment/entity/PaymentEntity";

@Entity("services")
export class ServiceEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => ClientEntity, (client) => client.services, {
    nullable: false,
    onDelete: "CASCADE",
  })
  client: ClientEntity;

  @ManyToOne(() => WorkerEntity, (worker) => worker.services, {
    nullable: false,
    onDelete: "CASCADE",
  })
  worker: WorkerEntity;

  @Column({ type: "timestamp" })
  onDate: Date;

  @Column({ type: "varchar", length: 255 })
  address: string;

  @Column({ type: "text" })
  description: string;

  @Column()
  type: string;

  @Column()
  status: string;

  @OneToOne(() => PaymentEntity, { nullable: true, cascade: true })
  @JoinColumn()
  payment: PaymentEntity | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
