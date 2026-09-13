"use client";
import ResourceManager from "@/app/admin/components/ResourceManager";
import type { FieldDef } from "@/app/admin/components/ResourceDialog";

const fields: FieldDef[] = [
  { name: "year", label: "Year", type: "text", placeholder: "e.g. 2021-2022" },
  { name: "title", label: "Title", type: "text" },
  { name: "institution", label: "Institution", type: "text" },
  { name: "description", label: "Description", type: "multiline", rows: 4 },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: ["university", "degree", "certificate", "ongoing"],
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["completed", "in-progress"],
  },
];

export default function EducationAdminPage() {
  return (
    <ResourceManager
      resource="education"
      title="Education Path"
      singular="Education entry"
      columns={[
        { key: "year", label: "Year" },
        { key: "title", label: "Title" },
        { key: "institution", label: "Institution" },
        { key: "type", label: "Type" },
        { key: "status", label: "Status" },
      ]}
      fields={fields}
      emptyItem={() => ({
        year: "",
        title: "",
        institution: "",
        description: "",
        type: "university",
        status: "completed",
      })}
    />
  );
}