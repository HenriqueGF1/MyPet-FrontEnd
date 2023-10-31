import { createContext } from "react";

import useAuth from "../hook/useAuth";
import useFetch from "../hook/useFetch";

const Context = createContext();

function AuthProvider({ children }) {

  const { authenticated, loading, setLoading, handleLogin, handleLogout, handleCreate } = useAuth();
  const { loadingApi, apiFetch } = useFetch();

  return (
    <Context.Provider
      value={{ authenticated, loading, setLoading, handleLogin, handleLogout, handleCreate, loadingApi, apiFetch }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
