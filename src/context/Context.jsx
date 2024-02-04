import React, { createContext } from "react";
import PropTypes from "prop-types";
import useAuth from "../hook/useAuth";
import useFetch from "../hook/useFetch";

const Context = createContext();

function AuthProvider({ children }) {
  const {
    user,
    authenticated,
    perfil,
    loading,
    handleLogin,
    handleLogout,
    handleCreate,
    handleLoginAdm,
  } = useAuth();

  const { loadingApi, apiFetch } = useFetch();

  const contextValue = {
    user,
    authenticated,
    perfil,
    loading,
    handleLogin,
    handleLogout,
    handleCreate,
    handleLoginAdm,
    loadingApi,
    apiFetch,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, AuthProvider };
