import { createContext } from "react";

import useAuth from "../hook/useAuth";

const Context = createContext();

function AuthProvider({ children }) {

  const { authenticated, loading, setLoading, handleLogin, handleLogout, handleCreate } = useAuth();

  return (
    <Context.Provider
      value={{ authenticated, loading, setLoading, handleLogin, handleLogout, handleCreate }}
    >
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
