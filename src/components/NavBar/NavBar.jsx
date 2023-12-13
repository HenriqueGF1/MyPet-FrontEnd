import { useContext, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/apiContext";

const NavBar = memo(function NavBar() {

    const { authenticated } = useContext(Context);
    const { loadingApi, apiFetch } = useContext(Context);

    const [user, setUser] = useState({
        id_usuario: '',
        nome: ""
    })

    useEffect(() => {

        if (localStorage.getItem("user") != undefined) {
            setUser((prev) => JSON.parse(localStorage.getItem("user")));
        }

    }, [])

    return (
        <>
            <br /><br />
            <p>Autenticado: {authenticated == true ? "Sim" : "Não"}</p>
            {
                authenticated ? <p>Usuário Nome: {user.nome} - {user.id_usuario}</p> : ""
            }
            <ul>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                <li>
                    <Link to='/loginAdm'>Login ADMIN</Link>
                </li>
                <li>
                    <Link to='/admin/denuncias'>ADMIN Listar Denuncias PENDENTES</Link>
                </li>
                <li>
                    <Link to='/admin/denuncias/respostas'>ADMIN Listar Denuncias RESPONDIDAS</Link>
                </li>
                <li>
                    <Link to='/admin/categorias/cadastrar'>ADMIN Categorias Cadastrar</Link>
                </li>
                <li>
                    <Link to='/admin/categorias'>ADMIN Categorias</Link>
                </li>
                <li>
                    <Link to='/admin/portes'>ADMIN Porte</Link>
                </li>
                <li>
                    <Link to='/admin/denunciasTipos/cadastrar'>ADMIN Tipo Denuncia Cadastrar</Link>
                </li>
                <li>
                    <Link to='/admin/denuncias/tipos'>ADMIN Tipos Denuncia</Link>
                </li>
                {
                    authenticated ? "" : <li><Link to='/create'>Criar Conta</Link></li>
                }
                {
                    authenticated ? <li><Link to={`/usuario/editar/${user.id_usuario}`}>Editar Usuário</Link></li> : ""
                }
                <li>
                    <Link to='/animais'>Animais</Link>
                </li>
                <li>
                    <Link to='/animais/cadastrar'>Criar Animais</Link>
                </li>
                {/* <li>
                    <Link to='/animais/editar'>Editar Animais</Link>
                </li> */}
                <li>
                    <Link to='/usuario/animais'>Meus Animais</Link>
                </li>
                <li>
                    <Link to='/contatos/cadastrar'>Criar Contato</Link>
                </li>
                <li>
                    <Link to='/usuarios/contatos'>Meus Contatos</Link>
                </li>
                <li>
                    <Link to='/enderecos/cadastrar'>Criar Endereço</Link>
                </li>
                <li>
                    <Link to={`/usuarios/${user.id_usuario}/enderecos`}>Meus Endereços</Link>
                </li>
                <li>
                    <Link to={`/minhas/denuncias`}>Minhas Denuncias</Link>
                </li>
                <li>
                    <Link to={`/animais/favoritos`}>Favoritos</Link>
                </li>
                <li>
                    <Link to='/teste'>Teste</Link>
                </li>
            </ul>
            <br /><br />
        </>
    )
});

export default NavBar;