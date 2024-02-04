import { useState, useEffect } from "react";
import api from "../services/axiosInstance";

export default function useFetch() {
  const abortController = new AbortController();
  const [loadingApi, setLoadingApi] = useState(false);

  const apiFetch = async (url, method, values = null) => {
    try {
      setLoadingApi(true);

      const response = await api(
        {
          method,
          url,
          data: values,
        },
        { signal: abortController.signal }
      );

      return {
        code: response.status,
        data: method === "get" ? response.data.data : response.data,
      };
    } catch (error) {
      return {
        code: error.response.status,
        data: error.response.data,
      };
    } finally {
      setLoadingApi(false);
    }
  };

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return { loadingApi, apiFetch };
}
