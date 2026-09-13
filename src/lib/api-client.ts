/**
 * Client-side fetch helpers for the admin UI (browser only).
 */

type AdminFetchInit = RequestInit & { body?: BodyInit };

export async function adminFetch<T = any>(
  path: string,
  init?: AdminFetchInit
): Promise<T> {
  const headers: Record<string, string> = {
    ...(init?.body ? { "Content-Type": "application/json" } : {}),
  };
  const res = await fetch(path, {
    ...init,
    headers: {
      ...headers,
      ...((init?.headers as Record<string, string>) ?? {}),
    },
  });

  if (res.status === 401) {
    if (typeof window !== "undefined") {
      window.location.href = "/admin/login";
    }
    throw new Error("Unauthorized");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`);
  }
  return data as T;
}

/** Upload an image file to Cloudinary via the admin API. */
export async function uploadImage(
  file: File,
  folder = "portfolio"
): Promise<{ secure_url: string; public_id: string }> {
  const fd = new FormData();
  fd.append("file", file);
  fd.append("folder", folder);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Upload failed");
  }
  return data;
}