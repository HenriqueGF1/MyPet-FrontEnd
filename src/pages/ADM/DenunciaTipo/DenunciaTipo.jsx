import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import TiposDenunciaList from "../../../components/Adm/TiposDenuncia/TiposDenunciaList";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function DenunciaTipo() {
  const [tiposDenuncia, setTiposDenuncia] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const getTiposDenuncia = async () => {
    let response = await apiFetch("admin/denuncias/tipos", "get");
    if (response.data != undefined) {
      setTiposDenuncia(response.data);
    }
  };

  useEffect(() => {
    getTiposDenuncia();
  }, []);

  const handleDelete = async (id_tipo) => {
    let response = await apiFetch(`admin/denuncias/tipos/${id_tipo}`, "delete");

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      getTiposDenuncia();

      toast.success("Excluído com Sucesso !!");
    }
  };

  const handleDesativar = async (id_tipo) => {
    let response = await apiFetch(
      `admin/denuncias/tipos/${id_tipo}/inativar`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      getTiposDenuncia();

      toast.success("Desativado com Sucesso !!");
    }
  };

  const handleAtivar = async (id_tipo) => {
    let response = await apiFetch(
      `admin/denuncias/tipos/${id_tipo}/ativar`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      getTiposDenuncia();

      toast.success("Ativado com Sucesso !!");
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Tipos Denúncia" />

      {loadingApi ? (
        <Loading />
      ) : tiposDenuncia.length > 0 ? (
        <div className="w-[100%] h-screen p-3">
          <div className="w-[100%] mb-3 flex justify-end">
            <Link
              to={`/admin/denunciasTipos/cadastrar`}
              className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
              type="submit"
            >
              Cadastrar Tipo
            </Link>
          </div>

          {tiposDenuncia.map((tipoDenuncia) => (
            <div key={tipoDenuncia.id_tipo}>
              <TiposDenunciaList
                id_tipo={tipoDenuncia.id_tipo}
                descricao={tipoDenuncia.descricao}
                dt_registro={tipoDenuncia.dt_registro}
                dt_inativacao={tipoDenuncia.dt_inativacao}
                dt_exclusao={tipoDenuncia.dt_exclusao}
                handleDesativar={handleDesativar}
                handleAtivar={handleAtivar}
                handleDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <h1>Sem porte</h1>
      )}

      <Footer />
    </>
  );
}

export default DenunciaTipo;
