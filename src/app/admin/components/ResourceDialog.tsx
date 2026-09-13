"use client";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import ImageUploader from "./ImageUploader";
import { FaSave } from "react-icons/fa";

export type FieldType =
  | "text"
  | "multiline"
  | "number"
  | "select"
  | "color"
  | "boolean"
  | "string-array"
  | "image";

export type FieldDef = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  rows?: number;
  help?: string;
  placeholder?: string;
};

type Props = {
  open: boolean;
  title: string;
  fields: FieldDef[];
  initial: Record<string, any>;
  saving: boolean;
  saveError?: string | null;
  onSubmit: (values: Record<string, any>) => void;
  onClose: () => void;
};

export default function ResourceDialog({
  open,
  title,
  fields,
  initial,
  saving,
  saveError,
  onSubmit,
  onClose,
}: Props) {
  const [values, setValues] = useState<Record<string, any>>(initial);
  const [error, setError] = useState<string | null>(null);
  // Track which item/record the form was initialized for, so re-renders of
  // the parent (e.g. grid state changes) don't wipe in-progress edits.
  const initKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (!open) return;
    // Editing an existing record: key by its id. Creating a new record:
    // `initial` is a fresh `emptyItem()` object on every parent render, so
    // key by field names (stable) instead of JSON values (change as you type).
    const key = initial?._id
      ? String(initial._id)
      : `new:${Object.keys(initial ?? {}).sort().join(",")}`;
    if (initKeyRef.current !== key) {
      initKeyRef.current = key;
      setValues(initial);
      setError(null);
    }
  }, [initial, open]);

  useEffect(() => {
    if (!open) initKeyRef.current = null;
  }, [open]);

  const set = (name: string, val: any) => setValues((v) => ({ ...v, [name]: val }));

  const setArrayItem = (name: string, idx: number, val: string) => {
    const arr = [...((values[name] as string[]) || [])];
    arr[idx] = val;
    set(name, arr);
  };

  /** Split an array into chunks of `size` for the two-column dialog layout. */
  const chunk = <T,>(arr: T[], size: number): T[][] => {
    const out: T[][] = [];
    for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
    return out;
  };

  const submit = () => {
    try {
      onSubmit(values);
    } catch (e: any) {
      setError(e?.message || "Save failed");
    }
  };

  const renderField = (field: FieldDef) => {
    const value = values[field.name];

    if (field.type === "multiline") {
      return (
        <TextField
          key={field.name}
          label={field.label}
          multiline
          rows={field.rows ?? 3}
          fullWidth
          value={value ?? ""}
          onChange={(e) => set(field.name, e.target.value)}
          helperText={field.help}
          InputProps={{
            sx: { fontSize: { xs: ".95rem", sm: "1rem" } },
          }}
        />
      );
    }
    if (field.type === "number") {
      return (
        <TextField
          key={field.name}
          label={field.label}
          type="number"
          fullWidth
          value={value ?? 0}
          onChange={(e) => set(field.name, Number(e.target.value))}
          InputProps={{
            sx: { fontSize: { xs: ".95rem", sm: "1rem" } },
          }}
        />
      );
    }
    if (field.type === "select") {
      return (
        <TextField
          key={field.name}
          select
          label={field.label}
          fullWidth
          value={value ?? ""}
          onChange={(e) => set(field.name, e.target.value)}
          helperText={field.help}
          SelectProps={{
            sx: { fontSize: { xs: ".95rem", sm: "1rem" } },
          }}
        >
          {field.options?.map((o) => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
        </TextField>
      );
    }
    if (field.type === "color") {
      return (
        <Box key={field.name}>
          <Typography variant="caption" sx={{ mb: 0.5, display: "block" }}>
            {field.label}
          </Typography>
          <input
            type="color"
            value={value ?? "#ffffff"}
            onChange={(e) => set(field.name, e.target.value)}
            style={{
              width: "100%",
              height: 48,
              background: "transparent",
              border: "1px solid #ffffff33",
              borderRadius: 6,
              cursor: "pointer",
            }}
          />
        </Box>
      );
    }
    if (field.type === "boolean") {
      return (
        <FormControlLabel
          key={field.name}
          control={
            <Switch
              checked={Boolean(value)}
              onChange={(e) => set(field.name, e.target.checked)}
            />
          }
          label={field.label}
          sx={{ py: 1 }}
        />
      );
    }
    if (field.type === "image") {
      return (
        <ImageUploader
          key={field.name}
          label={field.label}
          value={value ?? ""}
          onChange={(url) => set(field.name, url)}
        />
      );
    }
    if (field.type === "string-array") {
      const arr = (value as string[]) || [];
      return (
        <Box
          key={field.name}
          sx={{
            border: "1px solid #ffffff1f",
            borderRadius: 2,
            p: { xs: 1.5, sm: 1.5 },
            bgcolor: "#0c102188",
          }}
        >
          <Typography variant="caption" sx={{ opacity: 0.8, mb: 1, display: "block" }}>
            {field.label}
          </Typography>
          {arr.map((item, i) => (
            <TextField
              key={i}
              size="small"
              fullWidth
              sx={{ my: 0.5 }}
              value={item}
              placeholder={field.placeholder}
              onChange={(e) => setArrayItem(field.name, i, e.target.value)}
              InputProps={{
                sx: { fontSize: { xs: ".9rem", sm: ".95rem" } },
              }}
            />
          ))}
          <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
            <Button
              size="small"
              onClick={() => set(field.name, [...arr, ""])}
              sx={{ textTransform: "none", minHeight: 36 }}
            >
              + Add
            </Button>
            {arr.length > 0 && (
              <Button
                size="small"
                color="warning"
                onClick={() => set(field.name, arr.slice(0, -1))}
                sx={{ textTransform: "none", minHeight: 36 }}
              >
                – Remove last
              </Button>
            )}
          </Box>
        </Box>
      );
    }
    return (
      <TextField
        key={field.name}
        label={field.label}
        fullWidth
        value={value ?? ""}
        placeholder={field.placeholder}
        onChange={(e) => set(field.name, e.target.value)}
        helperText={field.help}
        InputProps={{
          sx: { fontSize: { xs: ".95rem", sm: "1rem" } },
        }}
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      fullScreen={false}
      PaperProps={{
        sx: {
          borderRadius: { xs: 0, sm: 3 },
          border: { xs: "none", sm: "1px solid #ffffff1f" },
          backgroundImage: "none",
          overflow: "hidden",
          m: { xs: 0, sm: 2 },
          maxHeight: { xs: "100%", sm: "90vh" },
        },
      }}
    >
      <DialogTitle
        sx={{
          fontWeight: 700,
          fontSize: { xs: "1.1rem", sm: "1.15rem" },
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
          bgcolor: "#6200ff22",
          borderBottom: "1px solid #ffffff14",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: { xs: 2, sm: 2.5 } }}>
      {fields.length > 12 ? (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, sm: 2.5 }, pt: { xs: 0.5, sm: 1 } }}>
          {chunk(fields, 2).map((row, i) => (
            <Box
              key={i}
              sx={{
                display: "grid",
                gap: { xs: 1.5, sm: 2 },
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              }}
            >
              {row.map(renderField)}
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 1.5, sm: 2 }, pt: { xs: 0.5, sm: 1 } }}>
          {fields.map(renderField)}
        </Box>
      )}
      </DialogContent>
      <DialogActions
        sx={{
          px: { xs: 2, sm: 3 },
          py: { xs: 1.5, sm: 2 },
          borderTop: "1px solid #ffffff14",
          position: "sticky",
          bottom: 0,
          bgcolor: "#0c1021",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, sm: 0 },
        }}
      >
        {(error || saveError) && (
          <Alert
            severity="error"
            sx={{
              mr: { xs: 0, sm: "auto" },
              py: 0.5,
              width: { xs: "100%", sm: "auto" },
              fontSize: { xs: ".85rem", sm: ".875rem" },
            }}
          >
            {saveError || error}
          </Alert>
        )}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            width: { xs: "100%", sm: "auto" },
            flexDirection: { xs: "column-reverse", sm: "row" },
          }}
        >
          <Button
            onClick={onClose}
            disabled={saving}
            fullWidth
            sx={{
              textTransform: "none",
              minHeight: { xs: 44, sm: 36 },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={saving}
            onClick={submit}
            startIcon={<FaSave size={14} />}
            fullWidth
            sx={{
              textTransform: "none",
              minHeight: { xs: 44, sm: 36 },
            }}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
}