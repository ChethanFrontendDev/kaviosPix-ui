import { useEffect, useState } from "react";
import { api } from "../api";

export default function useFetch(url, params = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(url, { params });
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Error while getting data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]);

  return { data, loading, error, refetch: fetchData };
}
