import { useContext, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/apiContext";

const NavBar = memo(function NavBar() {
    console.log("NavBar")
    const { authenticated } = useContext(Context);
    const { loadingApi, apiFetch } = useContext(Context);

    const [user, setUser] = useState({
        id_usuario: '',
        nome: ""
    })

    useEffect(() => {

        console.log("Aqui");

        setUser((prev) => JSON.parse(localStorage.getItem("user")));
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
                    <Link to='/teste'>Teste</Link>
                </li>
            </ul>
            <br /><br />
        </>
    )
});

export default NavBar;