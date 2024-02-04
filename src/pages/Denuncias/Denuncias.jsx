import DenunciasList from "../../components/Denuncias/DenunciasList";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function Denuncias() {
  const { authenticated, loading, setLoading } = useContext(Context);
  const [denuncias, setDenuncias] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getData() {
      let response = await apiFetch("animais/denuncias", "get");
      if (response.data != undefined) {
        setDenuncias(response.data);
      }
    }

    getData();
  }, []);

  const handleRetirarDenuncia = async (id_denuncia) => {
    let response = await apiFetch(
      `animais/retirarDenuncia/${id_denuncia}`,
      "patch"
    );

    if (response.data.code == 400) {
      alert(response.data.message);
    }

    if (response.code === 200) {
      const denuncia = denuncias.map((denuncia) =>
        denuncia.id_denuncia === id_denuncia
          ? { ...denuncia, dt_exclusao: response.data.dt_exclusao }
          : denuncia
      );

      setDenuncias((prev) => denuncia);

      toast.success("Retirada com Sucesso !!");
    }
  };

  const ativarNovamenteDenuncia = async (id_denuncia) => {
    let response = await apiFetch(
      `animais/ativarNovamenteDenuncia/${id_denuncia}`,
      "patch"
    );

    if (response.data.code == 400) {
      alert(response.data.message);
    }

    if (response.code === 200) {
      const denuncia = denuncias.map((denuncia) =>
        denuncia.id_denuncia === id_denuncia
          ? { ...denuncia, dt_exclusao: response.data.dt_exclusao }
          : denuncia
      );

      setDenuncias((prev) => denuncia);

      toast.success("Ativado Novamente Denúncia com Sucesso !!");
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Minhas Denúncias" />

      {loadingApi ? (
        <Loading />
      ) : denuncias.length > 0 ? (
        <div className="w-[100%] p-3">
          {denuncias.map((denuncia) => (
            <div key={denuncia.id_denuncia}>
              <DenunciasList
                id_denuncia={denuncia.id_denuncia}
                descricao={denuncia.descricao}
                tipo={denuncia.tipo}
                animal={denuncia.animal}
                dt_exclusao={denuncia.dt_exclusao}
                handleRetirarDenuncia={handleRetirarDenuncia}
                ativarNovamenteDenuncia={ativarNovamenteDenuncia}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem Denúncias...</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Denuncias;
