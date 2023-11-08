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
import UpdateAnimais from "../pages/Animais/UpdateAnimais";
import UsuarioAnimais from "../pages/Animais/UsuarioAnimais";
import Contatos from "../pages/Usuario/Contato/Contatos";
import UpdateContato from "../pages/Usuario/Contato/UpdateContato";
import CreateContato from "../pages/Usuario/Contato/CreateContato";
import UpdateUsuario from "../pages/Usuario/UpdateUsuario";

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
        <Route
          path="/usuario/editar/:id_usuario"
          element={
            <PrivateRoute>
              <UpdateUsuario />
            </PrivateRoute>
          }
        />
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
        <Route
          path="/animais/editar/:id_animal"
          element={
            <PrivateRoute>
              <UpdateAnimais />
            </PrivateRoute>
          }
        />
        <Route
          path="/usuario/animais"
          element={
            <PrivateRoute>
              <UsuarioAnimais />
            </PrivateRoute>
          }
        />
        {/*  */}
        <Route
          path="/contatos/cadastrar"
          element={
            <PrivateRoute>
              <CreateContato />
            </PrivateRoute>
          }
        />
        <Route
          path="usuarios/contatos"
          element={
            <PrivateRoute>
              <Contatos />
            </PrivateRoute>
          }
        />
        <Route
          path="/contatos/editar/:id_contato"
          element={
            <PrivateRoute>
              <UpdateContato />
            </PrivateRoute>
          }
        />
        {/* Rota 404 */}
        <Route path="*" element={<Navigate to="/home" replace />} />
        {/*  */}
        <Route
          path="/teste"
          element={
            // <PrivateRoute>
            <Teste />
            // </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
