"use client";
import { useRef, useState } from "react";
import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import Image from "next/image";
import { uploadImage } from "@/lib/api-client";

type Props = {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
};

export default function ImageUploader({ label, value, onChange, folder = "portfolio" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const { secure_url } = await uploadImage(file, folder);
      onChange(secure_url);
    } catch (err: any) {
      setError(err?.message || "Upload failed");
    } finally {
      setLoading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <Box>
      {label && (
        <Typography variant="caption" sx={{ display: "block", mb: 0.5 }}>
          {label}
        </Typography>
      )}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFile}
      />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          disabled={loading}
          onClick={() => fileRef.current?.click()}
          startIcon={loading ? <CircularProgress size={14} /> : null}
        >
          {loading ? "Uploading…" : "Upload image"}
        </Button>
        {value && (
          <Button size="small" color="warning" onClick={() => onChange("")}>
            Clear
          </Button>
        )}
      </Box>
      {value && (
        <Box
          sx={{
            mt: 1,
            position: "relative",
            height: 120,
            width: 180,
            border: "1px solid #ffffff33",
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <Image
            src={value}
            alt="Preview"
            fill
            unoptimized
            sizes="180px"
            style={{ objectFit: "cover" }}
          />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 1 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
}