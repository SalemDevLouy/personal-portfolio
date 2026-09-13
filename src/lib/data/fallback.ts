import type {
  Certification,
  Education,
  Project,
  Service,
  Settings,
  Skill,
} from "@/types";
import {
  certifications,
  education,
  projects,
  services,
  settings,
  skills,
} from "./fallback-data.mjs";

export const fallbackEducation = education as Education[];
export const fallbackCertifications = certifications as Certification[];
export const fallbackProjects = projects as Project[];
export const fallbackSkills = skills as Skill[];
export const fallbackServices = services as Service[];
export const fallbackSettings = settings as Settings;