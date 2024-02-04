import DenunciaDetalhes from "../../../components/Adm/Denuncias/DenunciaDetalhes";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function AdmDenuncias() {
  const [denuncias, setDenuncias] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const getDenuncias = async () => {
    let response = await apiFetch("admin/denuncias", "get");
    if (response.data != undefined) {
      setDenuncias(response.data);
    }
  };

  useEffect(() => {
    getDenuncias();
  }, []);

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Denúncias Pendentes" />

      {loadingApi ? (
        <Loading />
      ) : denuncias.length > 0 ? (
        <>
          <div className="w-[100%] p-3">
            {denuncias.map((denuncia) => {
              return (
                <div key={denuncia.id_denuncia}>
                  <DenunciaDetalhes
                    denuncia={denuncia}
                    usuario={denuncia.usuario}
                    usuarioDenunciante={denuncia.usuarioDenunciante}
                    animal={denuncia.animal}
                  >
                    <div className="p-3 my-5">
                      <Link
                        to={`/admin/denuncias/responder/${denuncia.id_denuncia}`}
                        className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02]"
                        type="submit"
                      >
                        Responder
                      </Link>
                    </div>
                  </DenunciaDetalhes>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem Denuncias</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default AdmDenuncias;
