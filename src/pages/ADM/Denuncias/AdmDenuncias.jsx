import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import DenunciaDetalhes from "../../../components/Adm/Denuncias/DenunciaDetalhes";
import Loading from "../../../components/Loading/Loading";
import { Link } from "react-router-dom";

function AdmDenuncias() {

    const [denuncias, setDenuncias] = useState([])
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const getDenuncias = async () => {
        let response = await apiFetch("admin/denuncias", "get")
        if (response.data != undefined) {
            setDenuncias(response.data);
        }
    }

    useEffect(() => {
        getDenuncias()
    }, [])

    return (
        <>
            <h1>Todas as Denuncias</h1>
            
            <NavBar />
            <br />

            <br />

            {loadingApi ? <Loading /> : (

                denuncias.length > 0 ? (
                    <>
                        {denuncias.map((denuncia) => {

                            return (
                                <div key={denuncia.id_denuncia}>
                                    <DenunciaDetalhes
                                        denuncia={denuncia}
                                        usuario={denuncia.usuario}
                                        usuarioDenunciante={denuncia.usuarioDenunciante}
                                        animal={denuncia.animal}
                                    >

                                        <Link to={`/admin/denuncias/responder/${denuncia.id_denuncia}`}>RESPONDER: - {denuncia.id_denuncia}</Link>

                                    </DenunciaDetalhes>
                                </div>
                            )
                        })}
                    </>
                ) : 'Sem Denuncias'
            )}

        </>

    );
}

export default AdmDenuncias;
