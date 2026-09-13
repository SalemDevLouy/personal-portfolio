export type ResourceBase = {
  _id?: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Education = ResourceBase & {
  /** Display label, e.g. "2021-2022" */
  year: string;
  title: string;
  institution: string;
  description: string;
  type: "university" | "degree" | "certificate" | "ongoing";
  status: "completed" | "in-progress";
};

export type Certification = ResourceBase & {
  title: string;
  /** e.g. "Udemy" */
  issuer: string;
  /** e.g. "2024" */
  date: string;
  /** Cloudinary secure_url or empty */
  imageUrl: string;
  /** Verification / certificate link */
  credentialUrl?: string;
};

export type Project = ResourceBase & {
  title: string;
  tagline?: string;
  description: string;
  /** Cloudinary URL or local /img/... */
  coverImage: string;
  /** Gallery of Cloudinary URLs */
  images: string[];
  /** Skill names / tags */
  techStack: string[];
  features: string[];
  demoUrl?: string;
  repoUrl?: string;
  client?: string;
  year?: string;
  featured: boolean;
};

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Testing"
  | "Tools";

export type Skill = ResourceBase & {
  name: string;
  /** Key into the lib/data/skills-icons mapping, e.g. "FaReact" */
  icon: string;
  /** Hex color, e.g. "#61dbfb" */
  color: string;
  category: SkillCategory;
};

export type Service = ResourceBase & {
  title: string;
  miniTitle: string;
  description: string;
  /** Rendered as check-list items in PricingCard */
  perks: string[];
};

export type SocialLinks = {
  github: string;
  linkedin: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  facebook: string;
  email: string;
  cv: string;
};

export type Settings = {
  _id?: string;
  email: string;
  socials: SocialLinks;
  updatedAt?: string;
};

export type AdminUser = {
  _id?: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt?: string;
};

export type ApiListResponse<T> = { items: T[] };
export type ApiDetailResponse<T> = { item: T };
export type ApiErrorResponse = { error: string };