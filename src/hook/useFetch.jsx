import { useState, useEffect } from "react";
import api from "../services/axiosInstance";

export default function useFetch() {

    const [loadingApi, setLoadingApi] = useState(true)

    const apiFetch = (url, method, values = null) => {

        return api({
            method: method,
            url: url,
            data: values
        }).then(function (response) {
            setLoadingApi(false)
            if (method === 'get') {
                return {
                    code: response.status,
                    data: response.data.data,
                }
            } else {
                return {
                    code: response.status,
                    data: response.data,
                }
            }
        }).catch(function (error) {
            setLoadingApi(false)
            return {
                code: error.response.status,
                data: error.response.data,
            }
        });

    }

    return { loadingApi, apiFetch };
}
