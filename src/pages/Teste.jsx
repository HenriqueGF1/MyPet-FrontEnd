
import { useContext, memo } from "react";
import NavBar from "../components/NavBar/NavBar";
// import useFetch from "../hook/useFetch";
import { Context } from "../context/apiContext";

function Teste() {

    const { response, errorApi, loadingApi, apiFetch } = useContext(Context);


    // const [data, errorApi, loadingApi] = useFetch('animais', 'get')

    // if (!loadingApi) {
    //     console.log("🚀 ~ file: Teste.jsx:11 ~ Teste ~ data:", data)
    // }

    const teste = () => {
        // console.log("AAA")

        let data = {
            nome: "Toto",
            descricao: "TotoFFFFFFFFFFFF",
            idade: "2023-10-27 22:22:42",
            sexo: "M",
            qtd_denuncia: 0,
            id_categoria: 1,
            id_porte: 1,
            id_usuario: 1,
            adotado: 0,
        }

        // apiFetch('animais', 'post', data)
        apiFetch('animais', 'get')
    }

    console.log("Meus retorno ", [
        response, errorApi, loadingApi
    ])

    return (
        <>
            <h1>Teste</h1>

            <button onClick={teste}>Teste</button>

            <NavBar />
        </>
    );
}

export default Teste;
