import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import {
  FaAws,
  FaCode,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJira,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
  FaSass,
} from "react-icons/fa";
import {
  SiCplusplus,
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRedux,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
} from "react-icons/si";

/**
 * Map of icon keys (stored in the `skills` collection) to react-icons
 * components. Mirrors the icons used by the original hardcoded Skills section.
 */
export const SKILL_ICON_MAP: Record<string, IconType> = {
  FaAws,
  FaCode,
  FaDocker,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJava,
  FaJira,
  FaLinux,
  FaNodeJs,
  FaPython,
  FaReact,
  FaSass,
  SiCplusplus,
  SiExpress,
  SiFirebase,
  SiGraphql,
  SiJavascript,
  SiJest,
  SiKubernetes,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNginx,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiRedux,
  SiTailwindcss,
  SiTestinglibrary,
  SiTypescript,
  SiVite,
};

/** All selectable icon keys (used by the admin skill form / select). */
export const SKILL_ICON_KEYS = Object.keys(SKILL_ICON_MAP);

export const SKILL_CATEGORIES = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Testing",
  "Tools",
] as const;

/**
 * Render the icon for a stored skill. Falls back to a neutral code icon when
 * the key is unknown (e.g. added by the admin with a stale/typo key).
 */
export function getSkillIcon(iconKey: string, color: string): ReactNode {
  const Icon = SKILL_ICON_MAP[iconKey] ?? FaCode;
  return <Icon color={color || "#ffffff"} size={24} />;
}