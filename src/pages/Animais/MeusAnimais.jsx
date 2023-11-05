import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisList from "../../components/Animais/AnimaisList";

function MeusAnimais() {

    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch("animais", "get")
            setAnimais(response.data);
        }

        getAnimais();

    }, []);

    const handleDelete = async (id_animal) => {
        // console.log("🚀 ~ file: MeusAnimais.jsx:29 ~ handleDelete ~ id_animal:", id_animal)
        // await api
        //     .delete(`animais/${id_animal}`)
        //     .then(function (response) {
        //         console.log("🚀 ~ file: MeusAnimais.jsx:33 ~ response:", response)
        //         setAnimais((prev) => prev.filter((animal) => animal.id_animal != id_animal))
        //     })
        //     .catch(function (error) {
        //         setErros(error);
        //     });

        let response = await apiFetch(`animais/${id_animal}`, "delete")

        console.log("🚀 ~ file: MeusAnimais.jsx:37 ~ handleDelete ~ response:", response)

        if (response.data.message != undefined) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Excluído com Sucesso !!')
            setAnimais((prev) => prev.filter((animal) => animal.id_animal != id_animal))
        }


    }
    console.log("🚀 ~ file: MeusAnimais.jsx:51 ~ MeusAnimais ~ loadingApi:", loadingApi)

    if (loadingApi) {
        return <h1>Carregando........</h1>
    }

    return (
        <>
            <h1>Meu Animais</h1>

            <NavBar />

            {animais.length == 0 ? "Sem animais" :
                animais.length == 0 ? <h1>Sem Animais...</h1> : animais.map((animal) => {
                    return (

                        <div key={animal.id_animal}>
                            <AnimaisList
                                id_animal={animal.id_animal}
                                nome={animal.nome}
                                usuario={animal.usuario.nome}
                                sexo={animal.sexo}
                                descricao={animal.descricao}
                                categoria={animal.categoria.descricao}
                                idade={animal.idade}
                                porte={animal.porte.descricao}
                                fotos={animal.fotos}
                                handleDelete={handleDelete}
                            />
                        </div>

                    )
                })}
        </>
    )


}

export default MeusAnimais;
