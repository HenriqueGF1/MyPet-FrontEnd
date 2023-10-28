import { useState, useEffect } from "react";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisList from "../../components/Animais/AnimaisList";

function MeusAnimais() {

    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);

    useEffect(() => {
        async function getData() {
            await api
                .get("animais")
                .then(function (response) {
                    setAnimais(response.data.data);
                })
                .catch(function (error) {
                    setErros(error);
                });
        }
        getData();
    }, []);

    const handleDelete = async (id_animal) => {
        console.log("🚀 ~ file: MeusAnimais.jsx:29 ~ handleDelete ~ id_animal:", id_animal)
        await api
            .delete(`animais/${id_animal}`)
            .then(function (response) {
                console.log("🚀 ~ file: MeusAnimais.jsx:33 ~ response:", response)
                setAnimais((prev) => prev.filter((animal) => animal.id_animal != id_animal))
            })
            .catch(function (error) {
                setErros(error);
            });
    }

    return (
        <>
            <h1>Meu Animais</h1>

            <NavBar />

            {animais.length == 0 ? <h1>Sem Animais...</h1> : animais.map((animal) => {
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
