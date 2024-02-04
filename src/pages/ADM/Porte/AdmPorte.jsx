import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import PorteList from "../../../components/Adm/Porte/PorteList";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function AdmPorte() {
  const [portes, setPortes] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getPorte() {
      let response = await apiFetch("admin/porteAnimais", "get");
      if (response.data != undefined) {
        setPortes(response.data);
      }
    }

    getPorte();
  }, []);

  const handleDelete = async (id_porte) => {
    let response = await apiFetch(`admin/porteAnimais/${id_porte}`, "delete");

    if (response.data.code == 400) {
      alert(response.data.message);
    }

    if (response.code === 200) {
      const porte = portes.map((porte) =>
        porte.id_porte === id_porte
          ? { ...porte, dt_exclusao: response.data.dt_exclusao }
          : porte
      );

      setPortes((prev) => porte);

      toast.success("Excluído com Sucesso !!");
    }
  };

  const handleDesativar = async (id_porte) => {
    let response = await apiFetch(
      `admin/porteAnimais/${id_porte}/desativar`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      const porte = portes.map((porte) =>
        porte.id_porte === id_porte
          ? { ...porte, dt_inativacao: response.data.data.dt_inativacao }
          : porte
      );

      setPortes((prev) => porte);

      toast.success("Desativado com Sucesso !!");
    }
  };

  const handleAtivar = async (id_porte) => {
    let response = await apiFetch(
      `admin/porteAnimais/${id_porte}/ativar`,
      "patch"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
      return;
    }

    if (response.code === 200) {
      const porte = portes.map((porte) =>
        porte.id_porte === id_porte
          ? { ...porte, dt_inativacao: response.data.data.dt_inativacao }
          : porte
      );

      setPortes((prev) => porte);

      toast.success("Ativado com Sucesso !!");
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Portes" />

      {loadingApi ? (
        <Loading />
      ) : portes.length > 0 ? (
        <div className="w-[100%] p-3">
          <div className="w-[100%] mb-8 flex justify-end">
            <Link
              to={`/admin/portes/cadastrar`}
              className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
              type="submit"
            >
              Cadastrar Porte
            </Link>
          </div>

          {portes.map((porte) => (
            <div key={porte.id_porte}>
              <PorteList
                id_porte={porte.id_porte}
                descricao={porte.descricao}
                dt_registro={porte.dt_registro}
                dt_inativacao={porte.dt_inativacao}
                dt_exclusao={porte.dt_exclusao}
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

export default AdmPorte;
