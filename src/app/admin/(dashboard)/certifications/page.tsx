"use client";
import ResourceManager from "@/app/admin/components/ResourceManager";
import type { FieldDef } from "@/app/admin/components/ResourceDialog";

const fields: FieldDef[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "issuer", label: "Issuer", type: "text", placeholder: "e.g. Udemy" },
  { name: "date", label: "Date", type: "text", placeholder: "e.g. 2024" },
  { name: "imageUrl", label: "Certificate image", type: "image", help: "Upload a certificate image to Cloudinary." },
  { name: "credentialUrl", label: "Credential / verify link", type: "text", placeholder: "https://…" },
];

export default function CertificationsAdminPage() {
  return (
    <ResourceManager
      resource="certifications"
      title="Certifications"
      singular="Certification"
      columns={[
        { key: "title", label: "Title" },
        { key: "issuer", label: "Issuer" },
        { key: "date", label: "Date" },
        { key: "credentialUrl", label: "Verify link" },
      ]}
      fields={fields}
      emptyItem={() => ({ title: "", issuer: "", date: "", imageUrl: "", credentialUrl: "" })}
    />
  );
}