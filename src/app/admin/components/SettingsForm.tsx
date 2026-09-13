"use client";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { adminFetch } from "@/lib/api-client";
import { fallbackSettings } from "@/lib/data/fallback";
import type { Settings, SocialLinks } from "@/types";

const SOCIAL_FIELDS: { key: keyof SocialLinks; label: string }[] = [
  { key: "github", label: "GitHub URL" },
  { key: "linkedin", label: "LinkedIn URL" },
  { key: "whatsapp", label: "WhatsApp URL" },
  { key: "telegram", label: "Telegram URL" },
  { key: "instagram", label: "Instagram URL" },
  { key: "facebook", label: "Facebook URL" },
  { key: "email", label: "Contact e-mail (mailto target)" },
  { key: "cv", label: "CV / Resume URL" },
];

export default function SettingsForm() {
  const [form, setForm] = useState<Settings>(fallbackSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    adminFetch<{ item: Settings | null }>("/api/admin/settings")
      .then((res) => {
        if (res.item) {
          setForm({
            ...fallbackSettings,
            ...res.item,
            socials: { ...fallbackSettings.socials, ...res.item.socials },
          });
        }
      })
      .catch((e) => setError(e?.message || "Failed to load settings"))
      .finally(() => setLoading(false));
  }, []);

  const set = (key: string, value: any) => setForm((f) => ({ ...f, [key]: value }));
  const setSocial = (key: keyof SocialLinks, value: string) =>
    setForm((f) => ({ ...f, socials: { ...f.socials, [key]: value } }));

  const save = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await adminFetch("/api/admin/settings", {
        method: "PUT",
        body: JSON.stringify(form),
      });
      setSuccess("Settings saved");
    } catch (e: any) {
      setError(e?.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        Settings
      </Typography>
      <Typography sx={{ color: "text.secondary", fontSize: ".9em", mb: 3 }}>
        Manage the site contact e-mail and social links shown in the navbar and footer. Leave a social link empty to hide it.
      </Typography>

      <Paper sx={{ p: 3, maxWidth: 720 }}>
        {loading ? (
          <Typography>Loading…</Typography>
        ) : (
          <>
            <TextField
              label="Contact e-mail"
              fullWidth
              sx={{ mb: 3 }}
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />

            <Typography variant="h6" sx={{ mb: 1 }}>
              Social links
            </Typography>
            {SOCIAL_FIELDS.map((field) => (
              <TextField
                key={field.key}
                label={field.label}
                size="small"
                fullWidth
                sx={{ my: 1 }}
                value={form.socials?.[field.key] ?? ""}
                onChange={(e) => setSocial(field.key, e.target.value)}
                placeholder="https://… or mailto:…"
              />
            ))}

            {error && (
              <Alert severity="error" sx={{ my: 2 }}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert severity="success" sx={{ my: 2 }}>
                {success}
              </Alert>
            )}
            <Button variant="contained" disabled={saving} onClick={save} sx={{ mt: 1 }}>
              {saving ? "Saving…" : "Save settings"}
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}