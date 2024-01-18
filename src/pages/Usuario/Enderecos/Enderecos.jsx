import { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import EnderecosList from "../../../components/Enderecos/EnderecosList";
import { useParams } from 'react-router-dom';
import Loading from "../../../components/Loading/Loading";
import { toast } from 'react-toastify';

function Enderecos() {

    const [enderecos, setEnderecos] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getEnderecos() {
            let response = await apiFetch(`usuarios/enderecos`, "get")
            if (response.data != undefined) {
                setEnderecos(response.data);
            }
        }

        getEnderecos();

    }, []);

    const handlePrincipal = async (id_endereco) => {

        let response = await apiFetch(`usuarios/enderecos/${id_endereco}/definirPrincipal`, "patch")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.code === 200) {

            let principal = 0;

            const endereco = enderecos.map(endereco => {
                if (endereco.id_endereco === id_endereco) {
                    principal = response.data.data.principal
                } else {
                    principal = 0;
                }
                return { ...endereco, principal: principal }
            });

            setEnderecos(
                prev => endereco
            );

            toast.success("Definido como principal com sucesso !!");
        }

    }

    const handleDelete = async (id_endereco) => {

        let response = await apiFetch(`enderecos/${id_endereco}`, "delete")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.data === 1) {
            toast.success('Excluído com Sucesso !!');
            setEnderecos((prev) => prev.filter((enderecos) => enderecos.id_endereco != id_endereco))
        }
    }

    return (
        <>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (
                enderecos.length > 0 ? (
                    <div className="bg-[--color-fundo] w-[100%] h-screen p-3">
                        {enderecos.map((endereco) => (
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
                            </div>
                        ))}
                    </div>
                ) : (
                    <h1>Sem Endereços...</h1>
                )
            )}
        </>
    )


}

export default Enderecos;
