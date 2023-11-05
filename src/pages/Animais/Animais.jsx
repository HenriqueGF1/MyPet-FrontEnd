import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import { Link } from "react-router-dom";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";

function Animais() {
    const { authenticated, loading, setLoading } = useContext(Context);
    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);

    useEffect(() => {

        setLoading(true);

        async function getData() {
            await api
                .get("animais")
                .then(function (response) {
                    setAnimais(response.data.data);
                    setLoading(false);
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }
        getData();
    }, []);


    if (loading) {
        return <h1>Carregando....................</h1>
    }

    return (
        <>
            <h1>Animais</h1>
            <NavBar />
            {/* <pre>{JSON.stringify(animais, null, 2)}</pre> */}
            {
                animais.length == 0 ? "Sem Animais" :
                    animais.map((animal) => {
                        return (
                            <ul key={animal.id_animal}>
                                <li><b>Nome:</b> {animal.nome}</li>
                                <li><b>Dono:</b> {animal.usuario.nome}</li>
                                <li><b>Sexo:</b> {animal.sexo}</li>
                                <li><b>Descricao:</b> {animal.descricao}</li>
                                <li><b>Categoria:</b> {animal.categoria.descricao}</li>
                                <li><b>Idade:</b> {animal.idade}</li>
                                <li><b>Porte:</b> {animal.porte.descricao}</li>
                                <li>
                                    <b>Fotos:</b>
                                    {animal.fotos.map((foto) => {
                                        return (
                                            <img
                                                key={foto.nome_arquivo}
                                                src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                                                width={'100px'}
                                            />
                                        )
                                    })}
                                </li>
                                <br />
                            </ul>
                        )
                    })
            }
        </>
    )


}

export default Animais;
