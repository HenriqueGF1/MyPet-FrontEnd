import PropTypes from 'prop-types';
import { createContext } from "react";

import useAuth from "../hook/useAuth";
import useFetch from "../hook/useFetch";

const Context = createContext();

function AuthProvider({ children }) {

  const { 
    authenticated,
    perfil,
    loading,
    handleLogin,
    handleLogout,
    handleCreate,
    handleLoginAdm
  } = useAuth();
  const { loadingApi, apiFetch } = useFetch();

  return (
    <Context.Provider
      value={{
        authenticated,
        perfil,
        loading,
        handleLogin,
        handleLogout,
        handleCreate,
        handleLoginAdm,
        loadingApi,
        apiFetch
      }}
    >
      {children}
    </Context.Provider>
  );

}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Context, AuthProvider };
