import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/apiContext";
import NavBar from "../../../components/NavBar/NavBar";
import Loading from '../../../components/Loading/Loading'
import { toast } from 'react-toastify';
import PorteList from "../../../components/Adm/Porte/PorteList";

function AdmPorte() {

    const [portes, setPortes] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getPorte() {
            let response = await apiFetch("admin/porteAnimais", "get")
            if (response.data != undefined) {
                setPortes(response.data);
            }
        }

        getPorte();

    }, []);

    const handleDelete = async (id_porte) => {

        let response = await apiFetch(`admin/porteAnimais/${id_porte}`, "delete")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            toast.success("Excluído com Sucesso !!");
            setPortes((prev) => prev.filter((porte) => porte.id_porte != id_porte))
        }

    }

    const handleDesativar = async (id_porte) => {

        let response = await apiFetch(`admin/porteAnimais/${id_porte}/desativar`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {

            const porte = portes.map(porte =>
                porte.id_porte === id_porte
                    ? { ...porte, dt_inativacao: response.data.data.dt_inativacao }
                    : porte
            );

            setPortes(
                prev => porte
            );

            toast.success("Desativado com Sucesso !!");
        }

    }

    const handleAtivar = async (id_porte) => {

        let response = await apiFetch(`admin/porteAnimais/${id_porte}/ativar`, "patch")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.code === 200) {

            const porte = portes.map(porte =>
                porte.id_porte === id_porte
                    ? { ...porte, dt_inativacao: response.data.data.dt_inativacao }
                    : porte
            );

            setPortes(
                prev => porte
            );

            toast.success("Ativado com Sucesso !!");
        }

    }

    return (
        <>
            <h1>Minhas Porte</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : portes.length > 0 ? (
                portes.map((porte) => (
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
                ))
            ) : (
                <h1>Sem porte</h1>
            )}
        </>
    )


}

export default AdmPorte;
