import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  timeout: 5000,
  headers: {
    "X-Custom-Header": "foobar",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    // "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
