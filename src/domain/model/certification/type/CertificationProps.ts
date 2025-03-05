import { Skill } from "@domain/model/skill/Skill";

export interface CertificationProps {
  skill: Skill;
  name: string;
  url: string;
}
