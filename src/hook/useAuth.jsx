import { useState, useEffect, useContext } from "react";
import api from "../services/axiosInstance";

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
    }

    const checkTokenIsValid = async () => {

      setLoading(true);

      await api.get("checkToken")
        .then(function (response) {
          let httpCodes = [401, 498];
          if (httpCodes.includes(response.data.code)) {
            setAuthenticated(false);
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            api.defaults.headers.Authorization = undefined;
            setLoading(false);
            return
          }
          setAuthenticated(true);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          return error
        });
    }

    checkTokenIsValid()

    const checkPerfil = async () => {

      setLoading(true);

      await api.get("checkPerfil")
        .then(function (response) {
          let httpCodes = [200];
          if (httpCodes.includes(response.status)) {
            setPerfil(response.data.id_perfil);
            setLoading(false);
            return
          }
          setAuthenticated(true);
          setLoading(false);
        })
        .catch(function (error) {
          setLoading(false);
          return error
        });
    }

    checkPerfil()

    // setLoading(false);
  }, []);

  const handleLogin = async (data) => {
    setLoading(true);
    const response = await api
      .post("login", data)
      .then(function (response) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.authorisation.token)
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            id_usuario: response.data.user.id_usuario,
            nome: response.data.user.nome,
            id_perfil: response.data.user.id_perfil,
          })
        );
        api.defaults.headers.Authorization = `Bearer ${response.data.authorisation.token}`;
        setAuthenticated(true);
        return { response, status }
      })
      .catch(function (error) {
        const { message, response } = error
        return { message, response }
      });
    setLoading(false);
    return response;
  };

  const handleLoginAdm = async (data) => {

    setLoading(true);
    const response = await api
      .post("admin/login", data)
      .then(function (response) {
        console.log("🚀 ~ file: useAuth.jsx:105 ~ response:", response)
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.authorisation.token)
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            id_usuario: response.data.user.id_usuario,
            nome: response.data.user.nome,
            id_perfil: response.data.user.id_perfil,
          })
        );
        api.defaults.headers.Authorization = `Bearer ${response.data.authorisation.token}`;
        setAuthenticated(true);
        return { response, status }


      })
      .catch(function (error) {
        if (error.response.data.code == 401) {
          alert('Não autorizado')
        }
        const { message, response } = error
        return { message, response }
      });
    setLoading(false);

    return response;
  };


  const handleLogout = async () => {
    setLoading(true);
    await api
      .get("logout")
      .then(function (response) {
        setAuthenticated(false);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        api.defaults.headers.Authorization = undefined;
      })
      .catch(function (error) {
        console.error(error);
      });
    setLoading(false);
  };

  const handleCreate = async (data) => {
    setLoading(true);
    const response = await api
      .post("create", data)
      .then(function (response) {
        localStorage.setItem(
          "token",
          JSON.stringify(response.data.authorisation.token)
        );
        api.defaults.headers.Authorization = `Bearer ${response.data.authorisation.token}`;
        setAuthenticated(true);
        return { response, status }
      })
      .catch(function (error) {
        return error;
      });
    setLoading(false);
    return response;
  };

  return { authenticated, perfil, loading, setLoading, handleLogin, handleLogout, handleCreate, handleLoginAdm };
}
