import EnderecosList from "../../../components/Enderecos/EnderecosList";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useContext, useCallback } from "react";

function Enderecos() {
  const [enderecos, setEnderecos] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getEnderecos() {
      let response = await apiFetch(`usuarios/enderecos`, "get");
      if (response.data != undefined) {
        setEnderecos(response.data);
      }
    }

    getEnderecos();
  }, []);

  const handlePrincipal = async (id_endereco) => {
    let response = await apiFetch(
      `enderecos/${id_endereco}/definirPrincipal`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.code === 200) {
      let principal = 0;

      const endereco = enderecos.map((endereco) => {
        if (endereco.id_endereco === id_endereco) {
          principal = response.data.data.principal;
        } else {
          principal = 0;
        }
        return { ...endereco, principal: principal };
      });

      setEnderecos((prev) => endereco);

      toast.success("Definido como principal com sucesso !!");
    }
  };

  const handleDelete = async (id_endereco) => {
    let response = await apiFetch(`enderecos/${id_endereco}`, "delete");

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.data === 1) {
      toast.success("Excluído com Sucesso !!");
      setEnderecos((prev) =>
        prev.filter((enderecos) => enderecos.id_endereco != id_endereco)
      );
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Meus Endereços" />

      {loadingApi ? (
        <Loading />
      ) : enderecos.length > 0 ? (
        <div className="w-[100%] h-screen p-3">
          <div className="w-[100%] mb-3 flex justify-end">
            <Link
              to={`/enderecos/cadastrar`}
              className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
              type="submit"
            >
              Cadastrar Endereço
            </Link>
          </div>

          {enderecos.map((endereco) => (
            <div key={endereco.id_endereco}>
              <EnderecosList
                id_endereco={endereco.id_endereco}
                cep={endereco.cep}
                bairro={endereco.bairro}
                numero={endereco.numero}
                complemento={endereco.complemento}
                principal={endereco.principal}
                handlePrincipal={handlePrincipal}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem Endereços...</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Enderecos;
