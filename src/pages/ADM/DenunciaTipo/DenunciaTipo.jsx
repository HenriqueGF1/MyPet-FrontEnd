import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import Loading from '../../../components/Loading/Loading'
import { toast } from 'react-toastify';
import TiposDenunciaList from "../../../components/Adm/TiposDenuncia/TiposDenunciaList";

function DenunciaTipo() {

    const [tiposDenuncia, setTiposDenuncia] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const getTiposDenuncia = async () => {
        let response = await apiFetch("admin/denuncias/tipos", "get")
        if (response.data != undefined) {
            setTiposDenuncia(response.data);
        }
    }

    useEffect(() => {
        getTiposDenuncia();
    }, []);

    const handleDelete = async (id_tipo) => {

        let response = await apiFetch(`admin/denuncias/tipos/${id_tipo}`, "delete")

        if (response.data.code == 400) {
            toast.warning(response.data.message)
        }

        if (response.code === 200) {

            getTiposDenuncia();

            toast.success("Excluído com Sucesso !!");
        }

    }

    const handleDesativar = async (id_tipo) => {

        let response = await apiFetch(`admin/denuncias/tipos/${id_tipo}/inativar`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {

            getTiposDenuncia();

            toast.success("Desativado com Sucesso !!");
        }

    }

    const handleAtivar = async (id_tipo) => {

        let response = await apiFetch(`admin/denuncias/tipos/${id_tipo}/ativar`, "patch")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.code === 200) {

            getTiposDenuncia();

            toast.success("Ativado com Sucesso !!");
        }

    }

    return (
        <>
            <h1>Tipos De Denuncias</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : tiposDenuncia.length > 0 ? (
                tiposDenuncia.map((tipoDenuncia) => (
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
                ))
            ) : (
                <h1>Sem porte</h1>
            )}
        </>
    )


}

export default DenunciaTipo;
