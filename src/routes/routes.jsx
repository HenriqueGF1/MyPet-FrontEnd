import { useContext } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { Context } from "../context/apiContext";
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {

  const { loadingApi, loading, authenticated } = useContext(Context);

  PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return loading ? <h1>Loading...</h1> : authenticated ? children : <Navigate to="/login" />;

};

const AdmRoute = ({ children }) => {

  const { loadingApi, perfil, loading, authenticated } = useContext(Context);
  console.log("🚀 ~ file: routes.jsx:21 ~ AdmRoute ~ perfil:", perfil)

  AdmRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return loading ? <h1>Loading...</h1> : perfil === 1 ? children : <Navigate to="/home" />;

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
import Enderecos from "../pages/Usuario/Enderecos/Enderecos";
import UpdateEnderecos from "../pages/Usuario/Enderecos/UpdateEnderecos";
import CreateEnderecos from "../pages/Usuario/Enderecos/CreateEnderecos";
import CreateDenuncia from "../pages/Denuncias/CreateDenuncia";
import Denuncias from "../pages/Denuncias/Denuncias";
import UpdateDenuncia from "../pages/Denuncias/UpdateDenuncia";
import AnimalShow from "../pages/Animais/AnimalShow";
import Favoritos from "../pages/Usuario/Favoritos/Favoritos";
import LoginAdm from "../pages/ADM/LoginAdm";
import CreateCategorias from "../pages/ADM/Categorias/CreateCategorias";
import AdmCategorias from "../pages/ADM/Categorias/AdmCategorias";
import UpdateCategoria from "../pages/ADM/Categorias/UpdateCategoria";
import AdmPorte from "../pages/ADM/Porte/AdmPorte";
import CreatePorte from "../pages/ADM/Porte/CreatePorte";
import UpdatePorte from "../pages/ADM/Porte/UpdatePorte";
import AnimaisImagens from "../pages/Animais/AnimaisImagens";
import DenunciaTipo from "../pages/ADM/DenunciaTipo/DenunciaTipo";
import CreateDenunciaTipo from "../pages/ADM/DenunciaTipo/CreateDenunciaTipo";
import UpdateDenunciaTipo from "../pages/ADM/DenunciaTipo/UpdateDenunciaTipo";
import AdmDenuncias from "../pages/ADM/Denuncias/ADMDenuncias";
import CreateDenunciaResposta from "../pages/ADM/Denuncias/CreateDenunciaResposta";
import AdmDenunciasRespostas from "../pages/ADM/Denuncias/AdmDenunciasRespostas";

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

        {/* Usuario */}

        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CriarConta />} />


        {/* ADMIN */}

        <Route path="/loginAdm" element={<LoginAdm />} />

        <Route
          path="/usuario/editar/:id_usuario"
          element={
            <PrivateRoute>
              <UpdateUsuario />
            </PrivateRoute>
          }
        />

        {/* ADM CATEGORIAS */}

        <Route
          path="/admin/categorias"
          element={
            <AdmRoute>
              <AdmCategorias />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/categorias/cadastrar"
          element={
            <AdmRoute>
              <CreateCategorias />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/categorias/editar/:id_categoria"
          element={
            <AdmRoute>
              <UpdateCategoria />
            </AdmRoute>
          }
        />

        {/* ADM PORTE */}

        <Route
          path="/admin/portes"
          element={
            <AdmRoute>
              <AdmPorte />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/portes/cadastrar"
          element={
            <AdmRoute>
              <CreatePorte />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/portes/editar/:id_porte"
          element={
            <AdmRoute>
              <UpdatePorte />
            </AdmRoute>
          }
        />

        {/* ADM DENUNCIAS TIPO */}

        <Route
          path="/admin/denuncias/tipos"
          element={
            <AdmRoute>
              <DenunciaTipo />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/denunciasTipos/cadastrar"
          element={
            <AdmRoute>
              <CreateDenunciaTipo />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/denunciasTipos/editar/:id_tipo"
          element={
            <AdmRoute>
              <UpdateDenunciaTipo />
            </AdmRoute>
          }
        />

        {/* ADM DENUNCIAS */}

        <Route
          path="/admin/denuncias"
          element={
            <AdmRoute>
              <AdmDenuncias />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/denuncias/responder/:id_denuncia"
          element={
            <AdmRoute>
              <CreateDenunciaResposta />
            </AdmRoute>
          }
        />

        <Route
          path="/admin/denuncias/respostas"
          element={
            <AdmRoute>
              <AdmDenunciasRespostas />
            </AdmRoute>
          }
        /> 

        {/* ANIMAIS */}

        <Route path="/animais" element={<Animais />} />

        <Route
          path="/animais/:id_animal"
          element={
            <PrivateRoute>
              <AnimalShow />
            </PrivateRoute>
          }
        />

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
          path="/animais/editar/imagens/:id_animal"
          element={
            <PrivateRoute>
              <AnimaisImagens />
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

        {/* CONTATOS */}

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

        {/* ENDERECOS */}

        <Route
          path="/usuarios/:id_usuario/enderecos"
          element={
            <PrivateRoute>
              <Enderecos />
            </PrivateRoute>
          }
        />

        <Route
          path="/enderecos/cadastrar"
          element={
            <PrivateRoute>
              <CreateEnderecos />
            </PrivateRoute>
          }
        />

        <Route
          path="/enderecos/editar/:id_endereco"
          element={
            <PrivateRoute>
              <UpdateEnderecos />
            </PrivateRoute>
          }
        />

        {/* DENUNCIAS */}

        <Route
          path="/denuncias/:id_usuario/:id_animal/cadastrar"
          element={
            <PrivateRoute>
              <CreateDenuncia />
            </PrivateRoute>
          }
        />

        <Route
          path="/minhas/denuncias"
          element={
            <PrivateRoute>
              <Denuncias />
            </PrivateRoute>
          }
        />

        <Route
          path="/denuncias/editar/:id_denuncia"
          element={
            <PrivateRoute>
              <UpdateDenuncia />
            </PrivateRoute>
          }
        />

        {/* FAVORITOS */}

        <Route
          path="/animais/favoritos"
          element={
            <PrivateRoute>
              <Favoritos />
            </PrivateRoute>
          }
        />

        {/* TESTE */}

        <Route
          path="/teste"
          element={
            <PrivateRoute>
              <Teste />
            </PrivateRoute>
          }
        />

        {/* Rota 404 */}

        <Route path="*" element={<Navigate to="/home" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
