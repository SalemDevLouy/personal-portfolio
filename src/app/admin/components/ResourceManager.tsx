"use client";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Skeleton,
  Snackbar,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaArrowDown, FaArrowUp, FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import { adminFetch } from "@/lib/api-client";
import ResourceDialog, { type FieldDef } from "./ResourceDialog";

type Column = { key: string; label: string };

type Props = {
  resource: string;
  title: string;
  singular?: string;
  columns: Column[];
  fields: FieldDef[];
  emptyItem: () => Record<string, any>;
};

export default function ResourceManager({
  resource,
  title,
  singular,
  columns,
  fields,
  emptyItem,
}: Props) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await adminFetch<{ items: any[] }>(`/api/admin/${resource}`);
      setItems(data.items || []);
      setError(null);
    } catch (e: any) {
      setError(e?.message || `Failed to load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }, [resource, title]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setSaveError(null);
    setEditing(null);
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setSaveError(null);
    setEditing(item);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setSaveError(null);
  };

  const submit = async (values: Record<string, any>) => {
    setSaving(true);
    setSaveError(null);
    try {
      if (editing?._id) {
        await adminFetch(`/api/admin/${resource}/${editing._id}`, {
          method: "PUT",
          // The edit form is seeded from the loaded row (which includes
          // _id/id/order/meta). Only send editable fields — extras like _id
          // or undefined `order` would trip server-side validation.
          body: JSON.stringify(
            Object.fromEntries(
              fields.map((f) => [f.name, values[f.name]])
            )
          ),
        });
        setToast("Item updated");
      } else {
        await adminFetch(`/api/admin/${resource}`, {
          method: "POST",
          body: JSON.stringify(values),
        });
        setToast("Item created");
      }
      closeDialog();
      await load();
    } catch (e: any) {
      // Surface API/validation errors inside the dialog so the user sees why the save failed.
      setSaveError(e?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await adminFetch(`/api/admin/${resource}/${deleteId}`, { method: "DELETE" });
      setToast("Item deleted");
      setDeleteId(null);
      await load();
    } catch (e: any) {
      setError(e?.message || "Delete failed");
      setDeleteId(null);
    }
  };

  const move = async (id: string, dir: -1 | 1) => {
    const idx = items.findIndex((i) => i._id === id);
    const swap = idx + dir;
    if (idx < 0 || swap < 0 || swap >= items.length) return;
    const next = items.slice();
    [next[idx], next[swap]] = [next[swap], next[idx]];
    try {
      await adminFetch(`/api/admin/${resource}/reorder`, {
        method: "POST",
        body: JSON.stringify({ orderedIds: next.map((i) => i._id) }),
      });
      setItems(next);
    } catch (e: any) {
      setError(e?.message || "Reorder failed");
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dialogTitle = editing
    ? `Edit ${singular ?? title}`
    : `New ${singular ?? title}`;

  return (
    <Box>
      <Toolbar sx={{ px: 0, mb: { xs: 2, sm: 1 }, flexWrap: "wrap", gap: 1 }}>
        <Box sx={{ flex: 1, minWidth: { xs: "100%", sm: "auto" } }}>
          <Typography variant="h5" sx={{ fontWeight: 700, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: ".8rem", sm: ".875rem" } }}>
            {loading
              ? "Loading…"
              : `${items.length} item${items.length === 1 ? "" : "s"}`}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={!isMobile && <FaPlus size={14} />}
          onClick={openCreate}
          fullWidth={isMobile}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
            minHeight: 44,
          }}
        >
          <FaPlus size={14} style={{ marginRight: isMobile ? 8 : 0 }} />
          Add New
        </Button>
      </Toolbar>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Stack spacing={2}>
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} variant="rounded" height={120} sx={{ borderRadius: 3 }} />
          ))}
        </Stack>
      ) : items.length === 0 ? (
        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid #ffffff14",
            bgcolor: "#ffffff05",
            textAlign: "center",
            py: 6,
          }}
        >
          <CardContent>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No items yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Get started by adding your first {singular ?? title.toLowerCase()}
            </Typography>
            <Button
              variant="contained"
              startIcon={<FaPlus size={14} />}
              onClick={openCreate}
              sx={{ borderRadius: 2, textTransform: "none" }}
            >
              Add {singular ?? title}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={{ xs: 2, sm: 2 }}>
          {items.map((item, idx) => (
            <Card
              key={item._id}
              sx={{
                borderRadius: 3,
                border: "1px solid #ffffff14",
                bgcolor: "#ffffff05",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: "#6200ff10",
                  borderColor: "#6200ff44",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(98, 0, 255, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: { xs: 2, sm: 2.5 }, "&:last-child": { pb: { xs: 2, sm: 2.5 } } }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  {/* Order number */}
                  <Chip
                    label={`#${idx + 1}`}
                    size="small"
                    sx={{
                      bgcolor: "#6200ff22",
                      color: "#a273ff",
                      fontWeight: 700,
                      minWidth: 40,
                      display: { xs: "none", sm: "flex" },
                    }}
                  />

                  {/* Content */}
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "repeat(auto-fit, minmax(200px, 1fr))" },
                        gap: { xs: 1.5, sm: 2 },
                      }}
                    >
                      {columns.map((col) => {
                        const value = item[col.key];
                        return (
                          <Box key={col.key}>
                            <Typography
                              variant="caption"
                              sx={{
                                color: "text.secondary",
                                fontWeight: 600,
                                textTransform: "uppercase",
                                fontSize: ".7rem",
                                letterSpacing: 0.5,
                              }}
                            >
                              {col.label}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: { xs: ".875rem", sm: ".9rem" },
                                fontWeight: 500,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: { xs: "normal", sm: "nowrap" },
                              }}
                            >
                              {Array.isArray(value)
                                ? `${value.length} items`
                                : String(value ?? "—")}
                            </Typography>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>

                  {/* Actions */}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={0.5}
                    sx={{ flexShrink: 0 }}
                  >
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="Move up">
                        <IconButton
                          size="small"
                          onClick={() => move(item._id, -1)}
                          disabled={idx === 0}
                          sx={{
                            bgcolor: "#ffffff0a",
                            "&:hover": { bgcolor: "#ffffff14" },
                            "&:disabled": { opacity: 0.3 },
                          }}
                        >
                          <FaArrowUp size={12} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Move down">
                        <IconButton
                          size="small"
                          onClick={() => move(item._id, 1)}
                          disabled={idx === items.length - 1}
                          sx={{
                            bgcolor: "#ffffff0a",
                            "&:hover": { bgcolor: "#ffffff14" },
                            "&:disabled": { opacity: 0.3 },
                          }}
                        >
                          <FaArrowDown size={12} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.5 }}>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          onClick={() => openEdit(item)}
                          sx={{
                            bgcolor: "#6200ff22",
                            color: "#a273ff",
                            "&:hover": { bgcolor: "#6200ff33" },
                          }}
                        >
                          <FaEdit size={13} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => setDeleteId(item._id)}
                          sx={{
                            bgcolor: "#ff000014",
                            color: "#ff6b6b",
                            "&:hover": { bgcolor: "#ff000022" },
                          }}
                        >
                          <FaTrashAlt size={12} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

      <ResourceDialog
        open={dialogOpen}
        title={dialogTitle}
        fields={fields}
        initial={editing ? editing : emptyItem()}
        saving={saving}
        saveError={saveError}
        onSubmit={submit}
        onClose={closeDialog}
      />

      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle sx={{ fontWeight: 700 }}>Confirm delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This will permanently remove the item. Continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={() => setDeleteId(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!toast}
        autoHideDuration={2500}
        onClose={() => setToast(null)}
        message={toast}
      />
    </Box>
  );
}