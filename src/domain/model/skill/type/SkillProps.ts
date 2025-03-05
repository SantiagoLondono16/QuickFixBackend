import { Certification } from "@domain/model/certification/Certification";
import { Worker } from "@domain/model/worker/Worker";

export interface SkillProps {
  name: string;
  description: string;
  worker: Worker;
  certifications: Certification[];
}
