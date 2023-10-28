import { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Context } from "../context/apiContext";

const PrivateRoute = ({ children }) => {
  const { loading, authenticated, checkTokenIsValid } = useContext(Context);

  if (loading) {
    // return <h1>Loading...</h1>;
    return
  }
  return authenticated ? children : <Navigate to="/login" />;
};

// Paginas
import Home from "../pages/Home";
import Login from "../pages/Login";
import Teste from "../pages/Teste";
import CriarConta from "../pages/CriarConta";
import Animais from "../pages/Animais/Animais";
import CreateAnimal from "../pages/Animais/CreateAnimal";
import Categoria from "../components/Categorias/Categorias";
import Porte from "../components/Porte/Porte";
import UpdateAnimais from "../pages/Animais/UpdateAnimais";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CriarConta />} />
        {/* Animais */}
        <Route path="/animais" element={<Animais />} />
        <Route
          path="/animais/cadastrar"
          element={
            <PrivateRoute>
              <CreateAnimal />
            </PrivateRoute>
          }
        />
        <Route path="/categoria" element={<Categoria />} />
        <Route path="/porte" element={<Porte />} />
        <Route
          path="/animais/editar"
          element={
            <PrivateRoute>
              <UpdateAnimais />
            </PrivateRoute>
          }
        />
        {/* Rota 404 */}
        <Route path="*" element={<Navigate to="/home" replace />} />
        {/*  */}
        <Route
          path="/teste"
          element={
            <PrivateRoute>
              <Teste />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}