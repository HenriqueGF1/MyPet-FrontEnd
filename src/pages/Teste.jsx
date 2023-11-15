
import { useState, useEffect, useContext, useCallback } from "react";
import NavBar from "../components/NavBar/NavBar";
import { Context } from "../context/apiContext";


function Teste() {

    const { loadingApi, apiFetch } = useContext(Context);
    const [dados, setDados] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            let response = await apiFetch("animais", "get")
            console.log("🚀 ~ file: Teste.jsx:15 ~ fetchData ~ response:", response.data)
            setDados(response.data);
        } catch (error) {
            console.error('Erro ao obter dados da API', error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id_animal, adotado) => {

        console.log(adotado == 1 ? 0 : 1)

        let response = await apiFetch(`animais/${id_animal}/adotado`, "patch", {
            adotado: adotado == 1 ? 0 : 1
        })

        console.log("🚀 ~ file: UsuarioAnimais.jsx:47 ~ handleAdotado ~ response:", response)

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {
            alert('Adotado com Sucesso !!')
            fetchData()
        }

    }

    return (
        <>
            <NavBar />
            <h1>Teste</h1><br />
            <h1>Contador {dados.nome}</h1><br />
            {dados.map((dado) => {
                return (
                    <ul key={dado.id_animal}>
                        <li>Adotado: {dado.adotado} </li>
                        <li>Nome: {dado.nome} </li>
                        <li>Descrição: {dado.descricao}</li>
                        <li onClick={() => handleDelete(dado.id_animal, dado.adotado)}>ADOTAR - {dado.id_animal}</li>
                        <br />
                    </ul>
                )
            })}
            <button onClick={fetchData}>Count ++</button>
        </>
    );
}

export default Teste;
