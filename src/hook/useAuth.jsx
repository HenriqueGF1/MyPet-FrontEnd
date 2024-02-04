import { useState, useEffect } from "react";
import api from "../services/axiosInstance";
import { toast } from "react-toastify";

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const authenticateUser = async () => {
      if (token) {
        try {
          api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
          if (user) {
            setPerfil(1);
            setAuthenticated(true);
            // checkTokenExpiration();
          }
        } catch (error) {
          console.error(error);
        }
      }
    };

    authenticateUser();
  }, [token]);

  const usuario = (id_usuario, nome, id_perfil, authenticated) => {
    return {
      id_usuario: id_usuario,
      nome: nome,
      id_perfil: id_perfil,
      authenticated: authenticated,
    };
  };

  const setLocalStorage = (key, values) => {
    localStorage.setItem(key, values);
  };

  const setAuthorizationApi = (value) => {
    api.defaults.headers.Authorization = value;
  };

  const clearLocalStorage = () => {
    localStorage.clear();
  };

  // const checkTokenExpiration = () => {
  //   const decodedToken = jwtDecode(token);
  //   const currentTime = Date.now() / 1000;
  //   if (decodedToken.exp < currentTime) {
  //     toast.warning("Seu acesso expirou");
  //     handleLogout();
  //   }
  // };

  const handleCreate = async (data) => {
    setLoading(true);

    try {
      const response = await api.post("create", data);

      const usuarioDados = usuario(
        response.data.user.id_usuario,
        response.data.user.nome,
        response.data.user.perfil_usuario[0].id_perfil,
        true
      );

      setLocalStorage(
        "token",
        JSON.stringify(response.data.authorisation.token)
      );
      localStorage.setItem("user", JSON.stringify(usuarioDados));
      setAuthorizationApi(`Bearer ${response.data.authorisation.token}`);
      setAuthenticated(true);

      return { response };
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data) => {
    setLoading(true);

    try {
      const response = await api.post("login", data);

      const usuarioDados = usuario(
        response.data.user.id_usuario,
        response.data.user.nome,
        response.data.user.perfil_usuario[0].id_perfil,
        true
      );

      setLocalStorage(
        "token",
        JSON.stringify(response.data.authorisation.token)
      );
      localStorage.setItem("user", JSON.stringify(usuarioDados));
      setAuthorizationApi(`Bearer ${response.data.authorisation.token}`);
      setAuthenticated(true);

      return { response };
    } catch (error) {
      const { message, response } = error;
      return { message, response };
    } finally {
      setLoading(false);
    }
  };

  const handleLoginAdm = async (data) => {
    setLoading(true);

    try {
      const response = await api.post("admin/login", data);

      const usuarioDados = usuario(
        response.data.user.id_usuario,
        response.data.user.nome,
        response.data.user.perfil_usuario[0].id_perfil,
        true
      );

      setLocalStorage(
        "token",
        JSON.stringify(response.data.authorisation.token)
      );
      setLocalStorage("user", JSON.stringify(usuarioDados));
      setAuthorizationApi(`Bearer ${response.data.authorisation.token}`);
      setAuthenticated((prev) => true);
      setPerfil((prev) => 1);

      return { response };
    } catch (error) {
      if (error.response?.data?.code === 401) {
        toast.error("Não autorizado");
      }

      const { message, response } = error;

      return { message, response };
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    let resultado = false;

    const token = localStorage.getItem("token");

    if (token == null) {
      return;
    }

    setLoading((prev) => true);

    try {
      const response = await api.get("logout");

      if (response.status === 200) {
        setAuthenticated(false);
        clearLocalStorage();
        setAuthorizationApi(undefined);

        resultado = true;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }

    return resultado;
  };

  return {
    user,
    authenticated,
    perfil,
    loading,
    handleLogin,
    handleLogout,
    handleCreate,
    handleLoginAdm,
  };
}
