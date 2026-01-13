import { useEffect, useState } from "react";
import { api } from "../api";

export default function usePost() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const postHandler = async (url, payload) => {
    setSuccess("");
    setError("");
    setLoading(true);

    try {
      const res = await api.post(url, payload);

      setSuccess(res.data.message);
      return res.data;
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Error submitting data"
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess("");
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  return { postHandler, success, loading, error };
}
