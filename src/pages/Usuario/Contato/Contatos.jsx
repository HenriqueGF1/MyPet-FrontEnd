import ContatosList from "../../../components/Contatos/ContatosList";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function Contatos() {
  const [contatos, setContatos] = useState([]);
  const { user, loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getContatos() {
      let response = await apiFetch(
        `usuarios/${user.id_usuario}/contatos`,
        "get"
      );
      if (response.data != undefined) {
        setContatos(response.data);
      }
    }

    getContatos();
  }, []);

  const handlePrincipal = async (id_contato) => {
    let response = await apiFetch(
      `contatos/${id_contato}/definirPrincipal`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.code === 200) {
      let principal = 0;

      const contato = contatos.map((contato) => {
        if (contato.id_contato === id_contato) {
          principal = response.data.data.principal;
        } else {
          principal = 0;
        }
        return { ...contato, principal: principal };
      });

      setContatos((prev) => contato);

      toast.success("Definido como principal com sucesso !!");
    }
  };

  const handleDelete = async (id_contato) => {
    let response = await apiFetch(`contatos/${id_contato}`, "delete");

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.data === 1) {
      toast.success("Excluído com Sucesso !!");
      setContatos((prev) =>
        prev.filter((contatos) => contatos.id_contato != id_contato)
      );
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Meus Contatos" />

      {loadingApi ? (
        <Loading />
      ) : contatos.length > 0 ? (
        <div className="h-screen w-[100%] p-3">
          <div className="w-[100%] mb-8 flex justify-end">
            <Link
              to={`/contatos/cadastrar`}
              className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
              type="submit"
            >
              Cadastrar Contato
            </Link>
          </div>

          {contatos.map((contato) => (
            <div key={contato.id_contato}>
              <ContatosList
                id_contato={contato.id_contato}
                dd={contato.dd}
                numero={contato.numero}
                principal={contato.principal}
                handlePrincipal={handlePrincipal}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem contatos...</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Contatos;
