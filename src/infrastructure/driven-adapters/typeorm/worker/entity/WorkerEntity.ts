import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { AccountEntity } from "../../account/entity/AccountEntity";
import { SkillEntity } from "../../skill/entity/SkillEntity";
import { ServiceEntity } from "../../service/entity/ServiceEntity";
import { ReviewEntity } from "../../review/entity/ReviewEntity";

@Entity("workers")
export class WorkerEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToOne(() => AccountEntity, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn()
  account?: AccountEntity;

  @OneToMany(() => ServiceEntity, (service) => service.worker)
  services: ServiceEntity[];

  @OneToMany(() => SkillEntity, (skill) => skill.worker, { cascade: true })
  skills: SkillEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.worker)
  reviews: ReviewEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
