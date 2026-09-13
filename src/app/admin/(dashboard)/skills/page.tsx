"use client";
import ResourceManager from "@/app/admin/components/ResourceManager";
import type { FieldDef } from "@/app/admin/components/ResourceDialog";
import { SKILL_CATEGORIES, SKILL_ICON_KEYS } from "@/lib/data/skills-icons";

const fields: FieldDef[] = [
  { name: "name", label: "Skill name", type: "text", placeholder: "e.g. React" },
  {
    name: "icon",
    label: "Icon",
    type: "select",
    options: SKILL_ICON_KEYS,
    help: "Icon key — matches the react-icons component used on the site.",
  },
  { name: "color", label: "Icon color", type: "color" },
  {
    name: "category",
    label: "Category",
    type: "select",
    options: [...SKILL_CATEGORIES],
  },
];

export default function SkillsAdminPage() {
  return (
    <ResourceManager
      resource="skills"
      title="Tech Skills"
      singular="Skill"
      columns={[
        { key: "name", label: "Name" },
        { key: "icon", label: "Icon" },
        { key: "color", label: "Color" },
        { key: "category", label: "Category" },
      ]}
      fields={fields}
      emptyItem={() => ({ name: "", icon: "FaReact", color: "#61dbfb", category: "Frontend" })}
    />
  );
}