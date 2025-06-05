import { useState, useEffect } from "react";
import { getMateriales } from "../../services/api/materialesApi";

export function useMateriales(page, perPage) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getMateriales(page, perPage)
      .then((res) => {
        setData(res); // res = { total_items, total_pages, current_page, per_page, items }
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, perPage]);

  return { data, loading, error };
}
