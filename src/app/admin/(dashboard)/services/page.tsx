"use client";
import ResourceManager from "@/app/admin/components/ResourceManager";
import type { FieldDef } from "@/app/admin/components/ResourceDialog";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text", placeholder: "e.g. Full-Stack Web Development" },
  { name: "miniTitle", label: "Mini title", type: "text", placeholder: "e.g. Enterprise Web Platforms" },
  { name: "description", label: "Description", type: "multiline", rows: 3 },
  { name: "perks", label: "Perks (list)", type: "string-array", placeholder: "e.g. Optimized for SEO and performance" },
];

export default function ServicesAdminPage() {
  return (
    <ResourceManager
      resource="services"
      title="Services"
      singular="Service"
      columns={[
        { key: "title", label: "Title" },
        { key: "miniTitle", label: "Mini title" },
        { key: "perks", label: "Perks (count)" },
      ]}
      fields={fields}
      emptyItem={() => ({ title: "", miniTitle: "", description: "", perks: [""] })}
    />
  );
}