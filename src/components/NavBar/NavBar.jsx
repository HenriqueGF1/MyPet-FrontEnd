import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext, memo, useEffect, useState } from "react";

function NavBar() {
  const { authenticated, perfil, handleLogout } = useContext(Context);

  const [user, setUser] = useState({
    id_usuario: "",
    nome: "",
  });

  const [hamburgerMenu, setHamburgerMenu] = useState(true);

  const onToggleMenu = () => {
    setHamburgerMenu((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleRota = (event) => {
    const rotaSelecionada = event.target.dataset.rote;
    navigate(rotaSelecionada);
  };

  const logout = () => {
    if (handleLogout()) {
      toast.success("Logout com sucesso");
      navigate("/");
      return;
    } else {
      toast.success("Erro");
    }
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user") || "{}"));
  }, [authenticated, perfil]);

  return (
    <>
      <header className="font-semibold mb-3">
        <nav className="w-[100%] h-[40px] mx-auto flex justify-between items-center text-sm">
          <div>
            <Link to="/" className="font-bold text-xl">
              MyPet
            </Link>
          </div>

          <div
            id="nav-links"
            className={`${
              hamburgerMenu ? "" : "bg-[#FFFFFF] top-[4.7%] py-10"
            } nav-links duration-500 lg:static absolute lg:min-h-fit min-h-[40vh] left-0 top-[-100%] lg:w-auto w-full flex items-center`}
          >
            <ul className="w-[100%] flex flex-col items-center justify-center gap-5 lg:flex lg:flex-row py-5 lg:py-0 inset-0 z-20">
              
              {user.id_perfil != 1 ? (
                <li>
                  <Link to="/">Animais</Link>
                </li>
              ) : (
                ""
              )}

              {user.authenticated && user.id_perfil != 1 ? (
                <>
                  <li>
                    <Link to="/animais/cadastrar">Cadastrar Animal</Link>
                  </li>
                  <li>
                    <Link to="/usuario/animais">Meus Animais</Link>
                  </li>
                  <li>
                    <Link to={`/animais/favoritos`}>Favoritos</Link>
                  </li>
                </>
              ) : (
                <li></li>
              )}
            </ul>
          </div>

          <div className="flex items-center">
            {user.authenticated ? (
              <button
                className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black"
                onClick={logout}
              >
                Sair
              </button>
            ) : (
              <>
                <Link
                  to="/create"
                  className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black"
                >
                  Criar Conta
                </Link>

                <Link
                  to="/login"
                  className="botao btn-group text-black bg-[--color-02] hover:bg-[--color-principal] hover:text-white"
                >
                  Login
                </Link>
              </>
            )}

            {user.authenticated ? (
              <div className="dropdown inline-block relative  inset-0 z-20">
                <button className="w-[110px] flex justify-between bg-[--color-fundo-input] font-medium p-2 items-center">
                  <span className="text-xs">Minha Conta</span>
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{" "}
                  </svg>
                </button>

                <ul className="w-[110px] dropdown-menu absolute hidden">
                  {user.authenticated && user.id_perfil != 1 ? (
                    <>
                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote="/usuarios/contatos"
                        onClick={handleRota}
                      >
                        Meus Contatos
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote="/contatos/cadastrar"
                        onClick={handleRota}
                      >
                        Cadastrar Contato
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote="/usuarios/enderecos"
                        onClick={handleRota}
                      >
                        Meus Endereços
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote="/enderecos/cadastrar"
                        onClick={handleRota}
                      >
                        Cadastrar Endereço
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote="/minhas/denuncias"
                        onClick={handleRota}
                      >
                        Minhas Denuncias
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/usuario/editar/${user.id_usuario}`}
                        onClick={handleRota}
                      >
                        Editar Usuário
                      </li>
                    </>
                  ) : (
                    <li></li>
                  )}

                  {user.authenticated && user.id_perfil === 1 ? (
                    <>
                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/admin/dashBoard`}
                        onClick={handleRota}
                      >
                        ADMIN DashBoard
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/admin/denuncias`}
                        onClick={handleRota}
                      >
                        ADMIN Listar Denuncias Pendentes
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/admin/denuncias/respostas`}
                        onClick={handleRota}
                      >
                        ADMIN Listar Denuncias Respondidas
                      </li>

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/admin/categorias`}
                        onClick={handleRota}
                      >
                        ADMIN Categorias
                      </li>

                      {/* <li className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]" data-rote={`/admin/categorias/cadastrar`} onClick={handleRota}>ADMIN Categorias Cadastrar</li> */}

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/admin/portes`}
                        onClick={handleRota}
                      >
                        ADMIN Portes
                      </li>

                      {/* <li className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]" data-rote={`/admin/portes/cadastrar`} onClick={handleRota}>ADMIN Porte Cadastrar</li> */}

                      <li
                        className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]"
                        data-rote={`/admin/denuncias/tipos`}
                        onClick={handleRota}
                      >
                        ADMIN Tipos Denuncia
                      </li>

                      {/* <li className="bg-[--color-fundo-input] cursor-default text-xs p-2 block hover:bg-[#FFFFFF]" data-rote={`/admin/denunciasTipos/cadastrar`} onClick={handleRota}>ADMIN Tipo Denuncia Cadastrar</li> */}
                    </>
                  ) : (
                    <li></li>
                  )}
                </ul>
              </div>
            ) : (
              ""
            )}

            <ion-icon
              onClick={onToggleMenu}
              name="menu"
              class="text-3xl cursor-pointer lg:hidden"
            ></ion-icon>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavBar;
