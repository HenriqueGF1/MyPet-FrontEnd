import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateRoute, AdmRoute } from "../routes/acesso";

// Páginas de Autenticação
import Login from "../pages/Login";
import CriarConta from "../pages/CriarConta";
import LoginAdm from "../pages/ADM/LoginAdm";

// Páginas de Usuário
import UpdateUsuario from "../pages/Usuario/UpdateUsuario";
import UsuarioAnimais from "../pages/Animais/UsuarioAnimais";
import Contatos from "../pages/Usuario/Contato/Contatos";
import UpdateContato from "../pages/Usuario/Contato/UpdateContato";
import CreateContato from "../pages/Usuario/Contato/CreateContato";
import Enderecos from "../pages/Usuario/Enderecos/Enderecos";
import UpdateEnderecos from "../pages/Usuario/Enderecos/UpdateEnderecos";
import CreateEnderecos from "../pages/Usuario/Enderecos/CreateEnderecos";
import Favoritos from "../pages/Usuario/Favoritos/Favoritos";

// Páginas de Animais
import Animais from "../pages/Animais/Animais";
import CreateAnimal from "../pages/Animais/CreateAnimal";
import UpdateAnimais from "../pages/Animais/UpdateAnimais";
import AnimaisImagens from "../pages/Animais/AnimaisImagens";
import AnimalShow from "../pages/Animais/AnimalShow";

// Páginas de Denúncias
import Denuncias from "../pages/Denuncias/Denuncias";
import UpdateDenuncia from "../pages/Denuncias/UpdateDenuncia";

// Páginas do Painel de Administração
import DashBoard from "../pages/ADM/DashBoard/DashBoard";
import AdmCategorias from "../pages/ADM/Categorias/AdmCategorias";
import CreateCategorias from "../pages/ADM/Categorias/CreateCategorias";
import UpdateCategoria from "../pages/ADM/Categorias/UpdateCategoria";
import AdmPorte from "../pages/ADM/Porte/AdmPorte";
import CreatePorte from "../pages/ADM/Porte/CreatePorte";
import UpdatePorte from "../pages/ADM/Porte/UpdatePorte";
import DenunciaTipo from "../pages/ADM/DenunciaTipo/DenunciaTipo";
import CreateDenunciaTipo from "../pages/ADM/DenunciaTipo/CreateDenunciaTipo";
import UpdateDenunciaTipo from "../pages/ADM/DenunciaTipo/UpdateDenunciaTipo";
import AdmDenuncias from "../pages/ADM/Denuncias/ADMDenuncias";
import CreateDenunciaResposta from "../pages/ADM/Denuncias/CreateDenunciaResposta";
import AdmDenunciasRespostas from "../pages/ADM/Denuncias/AdmDenunciasRespostas";

const routes = [

    // Páginas Publicas
    { path: "/create", element: <CriarConta /> },
    { path: "/login", element: <Login /> },
    { path: "/loginAdm", element: <LoginAdm /> },

    { path: "/", element: <Animais /> },
    { path: "/animais/:id_animal", element: <AnimalShow /> },

    // Páginas de Usuário
    { path: "/usuario/editar/:id_usuario", element: <PrivateRoute><UpdateUsuario /></PrivateRoute> },
    { path: "/usuario/animais", element: <PrivateRoute><UsuarioAnimais /></PrivateRoute> },
    { path: "/usuarios/contatos", element: <PrivateRoute><Contatos /></PrivateRoute> },
    { path: "/contatos/cadastrar", element: <PrivateRoute><CreateContato /></PrivateRoute> },
    { path: "/contatos/editar/:id_contato", element: <PrivateRoute><UpdateContato /></PrivateRoute> },
    { path: "/usuarios/enderecos", element: <PrivateRoute><Enderecos /></PrivateRoute> },
    { path: "/enderecos/cadastrar", element: <PrivateRoute><CreateEnderecos /></PrivateRoute> },
    { path: "/enderecos/editar/:id_endereco", element: <PrivateRoute><UpdateEnderecos /></PrivateRoute> },
    { path: "/minhas/denuncias", element: <PrivateRoute><Denuncias /></PrivateRoute> },
    { path: "/denuncias/editar/:id_denuncia", element: <PrivateRoute><UpdateDenuncia /></PrivateRoute> },

    // { path: "/animais", element: <Animais /> },
    { path: "/animais/cadastrar", element: <PrivateRoute><CreateAnimal /></PrivateRoute> },
    { path: "/animais/editar/:id_animal", element: <PrivateRoute><UpdateAnimais /></PrivateRoute> },
    // { path: "/animais/:id_animal", element: <AnimalShow /> },
    { path: "/animais/favoritos", element: <PrivateRoute><Favoritos /></PrivateRoute> },
    { path: "/animais/editar/imagens/:id_animal", element: <PrivateRoute><AnimaisImagens /></PrivateRoute> },

    // Páginas de Administração
    { path: "/admin/dashBoard", element: <AdmRoute><DashBoard /></AdmRoute> },
    { path: "/admin/categorias", element: <AdmRoute><AdmCategorias /></AdmRoute> },
    { path: "/admin/categorias/cadastrar", element: <AdmRoute><CreateCategorias /></AdmRoute> },
    { path: "/admin/categorias/editar/:id_categoria", element: <AdmRoute><UpdateCategoria /></AdmRoute> },
    { path: "/admin/portes", element: <AdmRoute><AdmPorte /></AdmRoute> },
    { path: "/admin/portes/cadastrar", element: <AdmRoute><CreatePorte /></AdmRoute> },
    { path: "/admin/portes/editar/:id_porte", element: <AdmRoute><UpdatePorte /></AdmRoute> },
    { path: "/admin/denuncias/tipos", element: <AdmRoute><DenunciaTipo /></AdmRoute> },
    { path: "/admin/denunciasTipos/cadastrar", element: <AdmRoute><CreateDenunciaTipo /></AdmRoute> },
    { path: "/admin/denunciasTipos/editar/:id_tipo", element: <AdmRoute><UpdateDenunciaTipo /></AdmRoute> },
    { path: "/admin/denuncias", element: <AdmRoute><AdmDenuncias /></AdmRoute> },
    { path: "/admin/denuncias/responder/:id_denuncia", element: <AdmRoute><CreateDenunciaResposta /></AdmRoute> },
    { path: "/admin/denuncias/respostas", element: <AdmRoute><AdmDenunciasRespostas /></AdmRoute> },
];



const AppRoutes = () => {

    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
        </BrowserRouter>
    );

};

export default AppRoutes;
