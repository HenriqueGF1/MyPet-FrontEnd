import { useState, useEffect } from "react";
import api from "../services/axiosInstance";

export default function useFetch() {

    const abortController = new AbortController();
    const [loadingApi, setLoadingApi] = useState(true)

    const apiFetch = async (url, method, values = null) => {
        try {
            setLoadingApi(true);

            const response = await api({
                method,
                url,
                data: values,
            }, { signal: abortController.signal });
            
            // console.log("🚀 ~ file: useFetch.jsx:18 ~ apiFetch ~ response:", response)

            if (response.data.code == 401) alert(response.data.message)

            return {
                code: response.status,
                data: method === 'get' ? response.data.data : response.data
            };
        } catch (error) {
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
