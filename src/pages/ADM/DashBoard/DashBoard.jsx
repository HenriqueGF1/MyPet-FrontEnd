import { useState, useEffect, useContext } from "react";
import { Context } from "../../../context/Context";
import NavBar from "../../../components/NavBar/NavBar";
import Loading from "../../../components/Loading/Loading";

function DashBoard() {

    const { loadingApi, apiFetch } = useContext(Context);
    const [dados, setDados] = useState([]);

    useEffect(() => {

        async function getDados() {
            let response = await apiFetch("admin/dashBoard", "get")
            console.log("🚀 ~ file: DashBoard.jsx:17 ~ getDados ~ response:", response.data)
            if (response.data != undefined) {
                setDados(response.data);
            }
        }

        getDados();

    }, []);

    return (
        <>
            <h1>ADM DashBoard</h1>

            <NavBar />

            {loadingApi ? <Loading /> : (
                <>
                    <p>Quantidade de Usuários: {dados.usuario}</p>
                    <p>Quantidade de Animais {dados.animal}</p>
                    <p>Quantidade de Animais Denunciados: {dados.animaisQtdDenuncias}</p>
                    <p>Quantidade de Animais Adotados: {dados.animaisAdotados}</p>
                    <p>Quantidade de Animais Não Adotados: {dados.animaisNaoAdotados}</p>
                    <p>Quantidade de Animais Masculinos: {dados.animaisMasculinos}</p>
                    <p>Quantidade de Animais Femininos: {dados.animaisFemininos}</p>
                </>
            )}


        </>
    )


}

export default DashBoard;
