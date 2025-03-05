import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SkillEntity } from "../../skill/entity/SkillEntity";

@Entity("certifications")
export class CertificationEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "text" })
  url: string;

  @ManyToOne(() => SkillEntity, (skill) => skill.certifications, {
    nullable: false,
    onDelete: "CASCADE",
  })
  skill: SkillEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
