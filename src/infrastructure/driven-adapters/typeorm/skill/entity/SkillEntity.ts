import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { CertificationEntity } from "../../certification/entity/CertificationEntity";
import { WorkerEntity } from "../../worker/entity/WorkerEntity";

@Entity("skills")
export class SkillEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  description: string;

  @OneToMany(() => CertificationEntity, (certification) => certification.skill)
  certifications: CertificationEntity[];

  @ManyToOne(() => WorkerEntity, (worker) => worker.skills, {
    onDelete: "CASCADE",
  })
  worker: WorkerEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
