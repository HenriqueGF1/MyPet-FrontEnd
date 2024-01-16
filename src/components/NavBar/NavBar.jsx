import { useContext, memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function NavBar() {

    const { authenticated } = useContext(Context);

    const [user, setUser] = useState({
        id_usuario: '',
        nome: ""
    })

    const [hamburgerMenu, setHamburgerMenu] = useState(true);

    const onToggleMenu = () => {
        setHamburgerMenu(prev => !prev);
    }

    useEffect(() => {

        if (localStorage.getItem("user") != undefined) {
            setUser((prev) => JSON.parse(localStorage.getItem("user")));
        }

    }, [])

    return (
        <>
            {/* //        <br /><br />
    //         <p>Autenticado: {authenticated == true ? "Sim" : "Não"}</p>
    //         {
    //             authenticated ? <p>Usuário Nome: {user.nome} - {user.id_usuario}</p> : ""
    //         }
    //         <ul>

    //             <li>
    //                 <Link to='/login'>Login</Link>
    //             </li>
    //             <li>
    //                 <Link to='/loginAdm'>Login ADMIN</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/dashBoard'>ADMIN DashBoard</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/denuncias'>ADMIN Listar Denuncias PENDENTES</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/denuncias/respostas'>ADMIN Listar Denuncias RESPONDIDAS</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/categorias/cadastrar'>ADMIN Categorias Cadastrar</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/categorias'>ADMIN Categorias</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/portes'>ADMIN Porte</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/portes/cadastrar'>ADMIN Porte Cadastrar</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/denunciasTipos/cadastrar'>ADMIN Tipo Denuncia Cadastrar</Link>
    //             </li>
    //             <li>
    //                 <Link to='/admin/denuncias/tipos'>ADMIN Tipos Denuncia</Link>
    //             </li>
    //             <li>
    //                 <Link to='/create'>Criar Conta</Link>
    //             </li>
    //             <li>
    //                 <Link to={`/usuario/editar/${user.id_usuario}`}>Editar Usuário</Link>
    //             </li>
    //             <li>
    //                 <Link to='/animais'>Animais</Link>
    //             </li>
    //             <li>
    //                 <Link to='/animais/cadastrar'>Cadastrar Animal</Link>
    //             </li>
    //             <li>
    //                 <Link to='/usuario/animais'>Meus Animais</Link>
    //             </li>
    //             <li>
    //                 <Link to='/contatos/cadastrar'>Criar Contato</Link>
    //             </li>
    //             <li>
    //                 <Link to='/usuarios/contatos'>Meus Contatos</Link>
    //             </li>
    //             <li>
    //                 <Link to='/enderecos/cadastrar'>Criar Endereço</Link>
    //             </li>
    //             <li>
    //                 <Link to={`/usuarios/enderecos`}>Meus Endereços</Link>
    //             </li>
    //             <li>
    //                 <Link to={`/minhas/denuncias`}>Minhas Denuncias</Link>
    //             </li>
    //             <li>
    //                 <Link to={`/animais/favoritos`}>Favoritos</Link>
    //             </li>
    //         </ul>
    //         <br /><br /> */}

            <header className="p-3 text-black">
                <nav className="flex justify-between items-center w-[90%] mx-auto">
                    <div>
                        <Link to='/animais' className="w-18 text-2xl">MyPet</Link>
                    </div>
                    <div id="nav-links"

                        className={`${hamburgerMenu ? "" : "bg-[#FFFFFF] top-[10%] py-10"} nav-links duration-500 lg:static absolute lg:min-h-fit min-h-[40vh] left-0 top-[-100%] lg:w-auto w-full flex items-center`}
                    >
                        <ul className="flex lg:flex-row w-[100%] items-center flex-col lg:gap-[4vw] gap-10">
                            <li>
                                <Link to='/animais/cadastrar'>Cadastrar Animal</Link>
                            </li>
                            <li>
                                <Link to='/usuario/animais'>Meus Animais</Link>
                            </li>
                            <li>
                                <a className="hover:text-gray-500" href="#">Solution</a>
                            </li>
                            <li>
                                <a className="hover:text-gray-500" href="#">Resource</a>
                            </li>
                            <li>
                                <a className="hover:text-gray-500" href="#">Developers</a>
                            </li>
                            <li>
                                <a className="hover:text-gray-500" href="#">Pricing</a>
                            </li>
                        </ul>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link to='/login' className="botao text-white bg-[--color-principal] hover:bg-[--color-secundaria] hover:text-black">Login</Link>
                        <ion-icon onClick={onToggleMenu} name="menu" class="text-3xl cursor-pointer lg:hidden"></ion-icon>
                    </div>
                </nav>
            </header>
        </>
    )
}

export default NavBar;