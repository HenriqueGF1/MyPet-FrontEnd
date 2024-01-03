import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import DenunciaDetalhes from "../../../components/Adm/Denuncias/DenunciaDetalhes";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";

function AdmDenunciasRespostas() {

    const [denunciasRespostas, setDenunciasRespostas] = useState([])
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const getDenunciasRespostas = async () => {
        let response = await apiFetch("admin/denuncias/respostas", "get")
        if (response.data != undefined) {
            setDenunciasRespostas(response.data);
        }
    }

    useEffect(() => {
        getDenunciasRespostas()
    }, [])

    return (
        <>
            <h1>Todas as Respostas de Denuncias</h1>
            <br />
            <NavBar />
            <br />

            {loadingApi ? <Loading /> : (

                denunciasRespostas.length > 0 ? (
                    <>
                        {denunciasRespostas.map((denuncia) => {

                            return (
                                <div key={denuncia.id_denuncia}>
                                    <DenunciaDetalhes
                                        denuncia={denuncia.denuncia}
                                        usuario={denuncia.denuncia.usuario}
                                        usuarioDenunciante={denuncia.denuncia.usuarioDenunciante}
                                        animal={denuncia.denuncia.animal}
                                    >

                                        <h1>ADM que respondeu</h1>
                                        <p>Data da Resposta: {denuncia.dt_resposta}</p>
                                        <p>Nome:{denuncia.usuario.nome} </p>
                                        <p>Decisão:{denuncia.aceite == 0 ? 'Não' : 'Sim'} </p>
                                        <p>Resposta:{denuncia.resposta} </p>

                                    </DenunciaDetalhes>
                                </div>
                            )
                        })}
                    </>
                ) : 'Sem Respostas'
            )}
        </>
    );
}

export default AdmDenunciasRespostas;
