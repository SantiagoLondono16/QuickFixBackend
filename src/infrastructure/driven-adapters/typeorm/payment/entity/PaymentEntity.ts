import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { ServiceEntity } from "../../service/entity/ServiceEntity";

@Entity("payments")
export class PaymentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value: number;

  @Column()
  type: string;

  @OneToOne(() => ServiceEntity, (service) => service.payment, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  service: ServiceEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
