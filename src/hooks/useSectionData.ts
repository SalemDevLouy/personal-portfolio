import { useEffect, useState } from "react";

type UseSectionDataResult<T> = {
  data: T[];
  loading: boolean;
};

/**
 * Fetch a public resource collection once on mount. Falls back to the
 * provided fallback data on error/empty so landing sections never blank out.
 */
export function useSectionData<T>(
  resource: string,
  fallback: T[]
): UseSectionDataResult<T> {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);

    fetch(`/api/public/${resource}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json) => {
        if (!alive) return;
        setData(
          Array.isArray(json?.items) && json.items.length > 0
            ? (json.items as T[])
            : fallback
        );
      })
      .catch(() => {
        if (alive) setData(fallback);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  return { data, loading };
}