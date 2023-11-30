import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import { Link } from "react-router-dom";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";
import DenunciasList from "../../components/Denuncias/DenunciasList";
import Loading from "../../components/Loading/Loading";
import { toast } from 'react-toastify';

function Denuncias() {
    const { authenticated, loading, setLoading } = useContext(Context);
    const [denuncias, setDenuncias] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getData() {
            let response = await apiFetch("animais/denuncias", "get")
            if (response.data != undefined) {
                setDenuncias(response.data);
            }
        }

        getData();

    }, []);

    const handleRetirarDenuncia = async (id_denuncia) => {

        let response = await apiFetch(`animais/retirarDenuncia/${id_denuncia}`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {

            const denuncia = denuncias.map(denuncia =>
                denuncia.id_denuncia === id_denuncia
                    ? { ...denuncia, dt_exclusao: response.data.data.dt_exclusao }
                    : denuncia
            );

            setDenuncias(
                prev => denuncia
            );

            toast.success("Retirada com Sucesso !!");
        }
    }


    if (loading) {
        return <h1>Carregando....................</h1>
    }

    return (
        <>
            <h1>Minhas Denuncias</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (
                denuncias.length > 0 ? (
                    denuncias.map((denuncia) => (
                        <div key={denuncia.id_denuncia}>
                            <DenunciasList
                                id_denuncia={denuncia.id_denuncia}
                                descricao={denuncia.descricao}
                                tipo={denuncia.tipo}
                                usuario={denuncia.usuario}
                                animal={denuncia.animal}
                                dt_exclusao={denuncia.dt_exclusao}
                                handleRetirarDenuncia={handleRetirarDenuncia}
                            />
                        </div>
                    ))
                ) : (
                    <p>Sem denúncias</p>
                )
            )}

        </>
    )


}

export default Denuncias;
