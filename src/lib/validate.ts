export type ValidateResult = {
  ok: boolean;
  value: Record<string, any>;
  errors: string[];
};

const isMissing = (v: unknown) => v === undefined || v === null;

const isPlainStr = (v: unknown): v is string => typeof v === "string";

const isUrlLike = (v: string) =>
  v === "" || /^(https?:\/\/|mailto:|\/)/.test(v);

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isHexColor = (v: string) => /^#[0-9a-fA-F]{3,8}$/.test(v);

type Rule = {
  required?: boolean;
  type?: "string" | "string[]" | "boolean" | "number";
  url?: boolean;
  email?: boolean;
  hex?: boolean;
  oneOf?: string[];
  default?: unknown;
};

type Schema = Record<string, Rule>;

/**
 * Lightweight payload validation for admin CRUD. Strips unknown fields,
 * coerces types, and returns a normalized value object on success.
 */
export function validateResource(
  body: Record<string, any>,
  schema: Schema
): ValidateResult {
  const value: Record<string, any> = {};
  const errors: string[] = [];

  for (const [key, rule] of Object.entries(schema)) {
    const raw = body?.[key];

    if (isMissing(raw) || raw === "") {
      if (rule.required) {
        errors.push(`${key} is required`);
        continue;
      }
      value[key] = rule.default;
      continue;
    }

    switch (rule.type ?? "string") {
      case "string": {
        if (!isPlainStr(raw)) {
          errors.push(`${key} must be a string`);
          break;
        }
        if (rule.url && !isUrlLike(raw)) {
          errors.push(`${key} must be a valid URL or mailto: link`);
          break;
        }
        if (rule.email && !isEmail(raw)) {
          errors.push(`${key} must be a valid email`);
          break;
        }
        if (rule.hex && !isHexColor(raw)) {
          errors.push(`${key} must be a valid hex color`);
          break;
        }
        if (rule.oneOf && !rule.oneOf.includes(raw)) {
          errors.push(`${key} must be one of: ${rule.oneOf.join(", ")}`);
          break;
        }
        value[key] = raw.trim();
        break;
      }
      case "boolean": {
        value[key] = Boolean(raw);
        break;
      }
      case "number": {
        const n = Number(raw);
        if (!Number.isFinite(n)) {
          errors.push(`${key} must be a number`);
          break;
        }
        value[key] = n;
        break;
      }
      case "string[]": {
        if (!Array.isArray(raw)) {
          errors.push(`${key} must be a list of strings`);
          break;
        }
        value[key] = raw.map((s) => String(s ?? "")).filter((s) => s !== "");
        break;
      }
    }
  }

  return { ok: errors.length === 0, value, errors };
}

const baseOrder = { order: { type: "number" as const, default: 0 } };

export const validateEducation = (body: Record<string, any>) =>
  validateResource(body, {
    year: { required: true },
    title: { required: true },
    institution: { required: true },
    description: { required: true },
    type: {
      required: true,
      oneOf: ["university", "degree", "certificate", "ongoing"],
    },
    status: { required: true, oneOf: ["completed", "in-progress"] },
    ...baseOrder,
  });

export const validateCertification = (body: Record<string, any>) =>
  validateResource(body, {
    title: { required: true },
    issuer: { required: true },
    date: { required: true },
    imageUrl: { url: true, default: "" },
    credentialUrl: { url: true, default: "" },
    ...baseOrder,
  });

export const validateProject = (body: Record<string, any>) =>
  validateResource(body, {
    title: { required: true },
    tagline: { default: "" },
    description: { required: true },
    coverImage: { url: true, default: "" },
    images: { type: "string[]", default: [] },
    techStack: { type: "string[]", default: [] },
    features: { type: "string[]", default: [] },
    demoUrl: { url: true, default: "" },
    repoUrl: { url: true, default: "" },
    client: { default: "" },
    year: { default: "" },
    featured: { type: "boolean", default: false },
    ...baseOrder,
  });

export const validateSkill = (body: Record<string, any>) =>
  validateResource(body, {
    name: { required: true },
    icon: { required: true },
    color: { required: true, hex: true },
    category: {
      required: true,
      oneOf: ["Frontend", "Backend", "Database", "DevOps", "Testing", "Tools"],
    },
    ...baseOrder,
  });

export const validateService = (body: Record<string, any>) =>
  validateResource(body, {
    title: { required: true },
    miniTitle: { required: true },
    description: { default: "" },
    perks: { type: "string[]", default: [] },
    ...baseOrder,
  });

export const validateSettings = (body: Record<string, any>) => {
  const socials = body?.socials ?? {};
  const socialsErrors: string[] = [];
  const cleanSocials: Record<string, string> = {};
  for (const key of [
    "github",
    "linkedin",
    "whatsapp",
    "telegram",
    "instagram",
    "facebook",
    "email",
    "cv",
  ]) {
    const v = socials[key];
    if (v !== undefined && v !== null && !isPlainStr(v)) {
      socialsErrors.push(`socials.${key} must be a string`);
      continue;
    }
    const str = String(v ?? "").trim();
    if (str !== "" && !isUrlLike(str)) {
      socialsErrors.push(`socials.${key} must be a valid URL or mailto: link`);
      continue;
    }
    cleanSocials[key] = str;
  }
  const email = body?.email ?? "";
  if (!isPlainStr(email) || !isEmail(email.trim())) {
    return { ok: false, value: {}, errors: ["email must be a valid email"] };
  }
  if (socialsErrors.length) {
    return { ok: false, value: {}, errors: socialsErrors };
  }
  return {
    ok: true,
    value: { email: email.trim(), socials: cleanSocials },
    errors: [],
  };
};