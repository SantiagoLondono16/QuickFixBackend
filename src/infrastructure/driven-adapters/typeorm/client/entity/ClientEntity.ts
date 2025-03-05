import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccountEntity } from "../../account/entity/AccountEntity";
import { ServiceEntity } from "../../service/entity/ServiceEntity";
import { ReviewEntity } from "../../review/entity/ReviewEntity";

@Entity({ name: "clients" })
export class ClientEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToOne(() => AccountEntity, { nullable: true, cascade: true })
  @JoinColumn()
  account: AccountEntity | null;

  @OneToMany(() => ServiceEntity, (service) => service.client, {
    cascade: true,
  })
  services: ServiceEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.client, {
    cascade: true,
  })
  reviews: ReviewEntity[];
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
