import { useState, useEffect } from "react";
import api from "../services/axiosInstance";

export default function useFetch() {

    const abortController = new AbortController();
    const [loadingApi, setLoadingApi] = useState(true)
    console.log("🚀 ~ file: useFetch.jsx:7 ~ useFetch ~ loadingApi:", loadingApi)

    const apiFetch = async (url, method, values = null) => {
        try {
            setLoadingApi(true);

            const response = await api({
                method,
                url,
                data: values,
            }, { signal: abortController.signal });

            return {
                code: response.status,
                data: method === 'get' ? response.data.data : response.data
            };
        } catch (error) {
            console.error("🚀 ~ file: useFetch.jsx:28 ~ apiFetch ~ error:", error);
            return {
                code: error.response.status,
                data: error.response.data,
            };
        } finally {
            setLoadingApi(false);
            abortController.abort();
        }
    };

    return { loadingApi, apiFetch };
}
