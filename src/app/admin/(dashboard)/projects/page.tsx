"use client";
import ResourceManager from "@/app/admin/components/ResourceManager";
import type { FieldDef } from "@/app/admin/components/ResourceDialog";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "tagline", label: "Tagline", type: "text" },
  { name: "description", label: "Description (project details)", type: "multiline", rows: 4 },
  { name: "coverImage", label: "Cover image", type: "image" },
  { name: "images", label: "Gallery images", type: "string-array", placeholder: "Cloudinary URL (upload each in the cover field first)" },
  { name: "techStack", label: "Tech stack", type: "string-array", placeholder: "e.g. Next.js" },
  { name: "features", label: "Features", type: "string-array", placeholder: "e.g. Real-time chat" },
  { name: "demoUrl", label: "Live demo URL", type: "text", placeholder: "https://…" },
  { name: "repoUrl", label: "Repository URL", type: "text", placeholder: "https://…" },
  { name: "client", label: "Client", type: "text" },
  { name: "year", label: "Year", type: "text" },
  { name: "featured", label: "Featured project", type: "boolean" },
];

export default function ProjectsAdminPage() {
  return (
    <ResourceManager
      resource="projects"
      title="Projects"
      singular="Project"
      columns={[
        { key: "title", label: "Title" },
        { key: "tagline", label: "Tagline" },
        { key: "client", label: "Client" },
        { key: "year", label: "Year" },
      ]}
      fields={fields}
      emptyItem={() => ({
        title: "",
        tagline: "",
        description: "",
        coverImage: "",
        images: [],
        techStack: [],
        features: [],
        demoUrl: "",
        repoUrl: "",
        client: "",
        year: "",
        featured: false,
      })}
    />
  );
}