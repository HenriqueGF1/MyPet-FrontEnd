import DenunciaDetalhes from "../../../components/Adm/Denuncias/DenunciaDetalhes";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { useState, useEffect, useContext } from "react";

function AdmDenunciasRespostas() {
  const [denunciasRespostas, setDenunciasRespostas] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const getDenunciasRespostas = async () => {
    let response = await apiFetch("admin/denuncias/respostas", "get");
    if (response.data != undefined) {
      setDenunciasRespostas(response.data);
    }
  };

  useEffect(() => {
    getDenunciasRespostas();
  }, []);

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Denúncias Respondidas" />

      {loadingApi ? (
        <Loading />
      ) : denunciasRespostas.length > 0 ? (
        <>
          <div className="w-[100%] p-3">
            {denunciasRespostas.map((denuncia) => {
              return (
                <div key={denuncia.id_resposta}>
                  <DenunciaDetalhes
                    denuncia={denuncia.denuncia}
                    usuario={denuncia.denuncia.usuario}
                    usuarioDenunciante={denuncia.denuncia.usuarioDenunciante}
                    animal={denuncia.denuncia.animal}
                  >
                    <div
                      className={`p-3 ${
                        denuncia.aceite == 0
                          ? "border-l-8 border-[--color-06]"
                          : "border-l-8 border-[--color-principal]"
                      }`}
                    >
                      <h1 className="text-base font-bold my-3">
                        Administrador Respondeu
                      </h1>
                      <p className="text-sm my-1 mr-1">
                        <b>Data da Resposta: </b>
                        {denuncia.dt_resposta}
                      </p>
                      <p className="text-sm my-1 mr-1">
                        <b>Nome: </b>
                        {denuncia.usuario.nome}
                      </p>
                      <p className="text-sm my-1 mr-1">
                        <b>Decisão: </b>
                        {denuncia.aceite == 0 ? "Não" : "Sim"}
                      </p>
                      <p className="text-sm my-1 mr-1">
                        <b>Resposta: </b>
                        {denuncia.resposta}
                      </p>
                    </div>
                  </DenunciaDetalhes>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        "Sem Respostas"
      )}

      <Footer />
    </>
  );
}

export default AdmDenunciasRespostas;
