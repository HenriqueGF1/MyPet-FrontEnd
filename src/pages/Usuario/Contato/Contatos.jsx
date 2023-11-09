import { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../../context/apiContext";
import NavBar from "../../../components/NavBar/NavBar";
import ContatosList from "../../../components/Contatos/ContatosList";

function Contatos() {

    const [contatos, setContatos] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getContatos() {
            let response = await apiFetch(`usuarios/1/contatos`, "get")
            console.log("🚀 ~ file: Contatos.jsx:15 ~ getContatos ~ response:", response)
            if (response.data != undefined) {
                setContatos(response.data);
            }
        }

        getContatos();

    }, []);

    const handlePrincipal = async (id_contato) => {

        console.log("🚀 ~ file: Contatos.jsx:26 ~ handlePrincipal ~ id_contato:", id_contato)

        let response = await apiFetch(`usuarios/1/contatos/${id_contato}/definirPrincipal`, "patch")

        console.log("🚀 ~ file: Contatos.jsx:31 ~ handlePrincipal ~ response:", response)
        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Alterado com Sucesso !!')
        }

    }

    const handleDelete = async (id_contato) => {

        let response = await apiFetch(`contatos/${id_contato}`, "delete")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Excluído com Sucesso !!')
            setContatos((prev) => prev.filter((contatos) => contatos.id_contato != id_contato))
        }
    }

    return (
        <>
            <h1>Meus Contatos</h1>
            <br />
            <NavBar />
            <br />
            {contatos.length != 0 ? contatos.map((contato) => {
                return (
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
                    </div >
                )

            })
                : <h1>Sem contatos...</h1>
            }
        </>
    )


}

export default Contatos;
