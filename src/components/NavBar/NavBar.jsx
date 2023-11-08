import { useContext, memo } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/apiContext";

const NavBar = memo(function NavBar() {
    const { authenticated } = useContext(Context);

    return (
        <>
            <br /><br />
            <p>Autenticado: {authenticated == true ? "Sim" : "Não"}</p>
            <ul>
                <li>
                    <Link to='/login'>Login</Link>
                </li>
                {
                    authenticated ? "" : <li><Link to='/create'>Criar Conta</Link></li>
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