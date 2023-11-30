import { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../../context/apiContext";
import NavBar from "../../../components/NavBar/NavBar";
import ContatosList from "../../../components/Contatos/ContatosList";
import Loading from '../../../components/Loading/Loading'
import { toast } from 'react-toastify';

function Contatos() {

    const [contatos, setContatos] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getContatos() {
            let response = await apiFetch(`usuarios/1/contatos`, "get")
            if (response.data != undefined) {
                setContatos(response.data);
            }
        }

        getContatos();

    }, []);

    const handlePrincipal = async (id_contato) => {

        let response = await apiFetch(`usuarios/1/contatos/${id_contato}/definirPrincipal`, "patch")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.code === 200) {

            let principal = 0;

            const contato = contatos.map(contato => {
                if (contato.id_contato === id_contato) {
                    principal = response.data.data.principal
                } else {
                    principal = 0;
                }
                return { ...contato, principal: principal }
            });

            setContatos(
                prev => contato
            );

            toast.success("Definido como principal com sucesso !!");
        }

    }

    const handleDelete = async (id_contato) => {

        let response = await apiFetch(`contatos/${id_contato}`, "delete")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.data === 1) {
            toast.success("Excluído com Sucesso !!");
            setContatos((prev) => prev.filter((contatos) => contatos.id_contato != id_contato))
        }
    }

    return (
        <>
            <h1>Meus Contatos</h1>
            <br />
            <NavBar />
            <br />
            {loadingApi ? (
                <Loading />
            ) : contatos.length > 0 ? (
                contatos.map((contato) => (
                    <div key={contato.id_contato}>
                        <ContatosList
                            id_contato={contato.id_contato}
                            dd={contato.dd}
                            numero={contato.numero}
                            principal={contato.principal}
                            handlePrincipal={handlePrincipal}
                            handleDelete={handleDelete}
                        />
                        <h1>-------</h1>
                    </div>
                ))
            ) : (
                <h1>Sem contatos...</h1>
            )}
        </>
    )


}

export default Contatos;
