import PropTypes from "prop-types";
import { Context } from "../context/Context";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

export const isTokenExpired = () => {
  const token = localStorage.getItem("token");

  if (token == null) {
    return false;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = new Date().getTime() / 1000;

  return decodedToken.exp < currentTime;
};

export const PrivateRoute = ({ children }) => {
  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const { loadingApi, perfil, authenticated, handleLogout } =
    useContext(Context);

  const [usuario, setUsuario] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  if (isTokenExpired()) {
    toast.warning("Seu acesso expirou");
    handleLogout();
    return <Navigate to="/login" />;
  }

  return usuario.authenticated ? children : <Navigate to="/login" />;
};

export const AdmRoute = ({ children }) => {
  AdmRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const { authenticated, perfil, handleLogout } = useContext(Context);

  const [userADM, setUserADM] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );

  if (!userADM.authenticated) return <Navigate to="/loginAdm" />;

  if (isTokenExpired()) {
    toast.warning("Seu acesso expirou");
    handleLogout();
    return <Navigate to="/loginAdm" />;
  }

  if (userADM.id_perfil !== 1) {
    toast.warning("Você não é autorizado.");
    return <Navigate to="/loginAdm" />;
  }

  return userADM.authenticated ? children : <Navigate to="/loginAdm" />;
};
