import { useState, useEffect } from "react";
import api from "../services/axiosInstance";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export default function useAuth() {

  const [authenticated, setAuthenticated] = useState(false);
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  // console.log("🚀 ~ file: useAuth.jsx:12 ~ useAuth ~ token:", token)

  useEffect(() => {

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      // checkTokenExpiration()
    }

  }, []);

  const setLocalStorage = (key, values) => {
    localStorage.setItem(
      key,
      values
    );
  }

  const setAuthorizationApi = (value) => {
    api.defaults.headers.Authorization = value
  }

  const clearLocalStorage = () => {
    localStorage.clear();
  }

  // const checkTokenExpiration = () => {

  //   console.log('checkTokenExpiration')

  //   const decodedToken = jwtDecode(token);
  //   const currentTime = Date.now() / 1000;
  //   console.log("🚀 ~ file: useAuth.jsx:45 ~ checkTokenExpiration ~ currentTime:", currentTime)
  //   if (decodedToken.exp < currentTime) {
  //     toast.warning('Seu acesso expirou')
  //     handleLogout()
  //   }

  // }

  const handleCreate = async (data) => {

    setLoading(true);

    const response = await api
      .post("create", data)
      .then(function (response) {

        if (response.status === 200) {
          setLocalStorage("token", JSON.stringify(response.data.authorisation.token))
          setAuthorizationApi(`Bearer ${response.data.authorisation.token}`)
          setAuthenticated(true);
          toast.success('Bem vindo(a)')
        } else {
          toast.warning('Erro ao cadastrar conta')
        }

        return { response };
      })
      .catch(function (error) {
        console.log("🚀 ~ file: useAuth.jsx:141 ~ handleCreate ~ error:", error)
        return error;
      }).finally(function () {
        setLoading(false);
      });

    return response;
  };

  const handleLogin = async (data) => {

    setLoading(true);

    const response = await api
      .post("login", data)
      .then(function (response) {

        if (response.status === 200) {

          let usuario = JSON.stringify({
            nome: response.data.user.nome
          })

          setLocalStorage("token", JSON.stringify(response.data.authorisation.token))
          setLocalStorage("user", usuario)
          setAuthorizationApi(`Bearer ${response.data.authorisation.token}`)

          setAuthenticated(true);

        } else {
          toast.warning('Erro ao realizar login')
        }

        return { response };
      })
      .catch(function (error) {
        const { message, response } = error;
        return { message, response };
      }).finally(function () {
        setLoading(false);
      });

    return response;
  };

  const handleLoginAdm = async (data) => {

    setLoading(true);

    const response = await api
      .post("admin/login", data)
      .then(function (response) {
        console.log("🚀 ~ file: useAuth.jsx:87 ~ response:", response)

        if (response.status === 200) {

          let usuario = JSON.stringify({
            id_usuario: response.data.user.id_usuario,
            nome: response.data.user.nome,
            id_perfil: response.data.user.perfil_usuario[0].id_perfil_usuario
          })

          console.log("🚀 ~ file: useAuth.jsx:134 ~ usuario:", usuario)

          setLocalStorage("token", JSON.stringify(response.data.authorisation.token))
          setLocalStorage("user", usuario)
          setAuthorizationApi(`Bearer ${response.data.authorisation.token}`)

          setAuthenticated(true);
          setPerfil(1);

        } else {
          toast.warning('Erro ao realizar login')
        }

        return { response };
      })
      .catch(function (error) {
        if (error.response.data.code == 401) {
          toast.error("Não autorizado");
        }
        const { message, response } = error;
        return { message, response };
      }).finally(function () {
        setLoading(false);
      });

    return response;
  };

  const handleLogout = async () => {

    const token = localStorage.getItem("token");

    if (token == null) {
      return 
    }

    setLoading(true);

    await api
      .get("logout")
      .then(function (response) {
        console.log("🚀 ~ file: useAuth.jsx:157 ~ response:", response)
        if (response.status === 200) {
          setAuthenticated(false);
          clearLocalStorage()
          setAuthorizationApi(undefined)
          toast.success('Logout com sucesso')
        } else {
          toast.warning('Erro ao sair')
        }
      })
      .catch(function (error) {
        console.error(error);
      }).finally(function () {
        setLoading(false);
      });
  };

  return {
    authenticated,
    perfil,
    loading,
    handleLogin,
    handleLogout,
    handleCreate,
    handleLoginAdm
  };
}
