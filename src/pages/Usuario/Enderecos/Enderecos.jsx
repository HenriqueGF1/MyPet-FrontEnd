import { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../../context/apiContext";
import NavBar from "../../../components/NavBar/NavBar";
import EnderecosList from "../../../components/Enderecos/EnderecosList";
import { useParams } from 'react-router-dom';

function Enderecos() {

    let { id_usuario } = useParams();
    const [enderecos, setEnderecos] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getEnderecos() {
            let response = await apiFetch(`usuarios/${id_usuario}/enderecos`, "get")
            if (response.data != undefined) {
                console.log("🚀 ~ file: Enderecos.jsx:16 ~ getEnderecos ~ response:", response)
                setEnderecos(response.data);
            }
        }

        getEnderecos();

    }, []);

    const handlePrincipal = async (id_endereco) => {

        console.log("🚀 ~ file: Enderecos.jsx:26 ~ handlePrincipal ~ id_endereco:", id_endereco)

        let response = await apiFetch(`usuarios/1/enderecos/${id_endereco}/definirPrincipal`, "patch")

        console.log("🚀 ~ file: Enderecos.jsx:30 ~ handlePrincipal ~ response:", response)

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Alterado com Sucesso !!')
        }

    }

    const handleDelete = async (id_endereco) => {

        console.log("🚀 ~ file: Enderecos.jsx:43 ~ handleDelete ~ id_endereco:", id_endereco)

        let response = await apiFetch(`enderecos/${id_endereco}`, "delete")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Excluído com Sucesso !!')
            setEnderecos((prev) => prev.filter((enderecos) => enderecos.id_endereco != id_endereco))
        }
    }

    return (
        <>
            <h1>Meus Endereços</h1>
            <br />
            <NavBar />
            <br />
            {enderecos.length != 0 ? enderecos.map((endereco) => {
                return (
                    <div key={endereco.id_endereco}>
                        <EnderecosList
                            id_endereco={endereco.id_endereco}
                            cep={endereco.cep}
                            bairro={endereco.bairro}
                            numero={endereco.numero}
                            complemento={endereco.complemento}
                            principal={endereco.principal}
                            handlePrincipal={handlePrincipal}
                            handleDelete={handleDelete}
                        />
                        <h1>-------</h1>
                    </div >
                )

            })
                : <h1>Sem Endereços...</h1>
            }
        </>
    )


}

export default Enderecos;