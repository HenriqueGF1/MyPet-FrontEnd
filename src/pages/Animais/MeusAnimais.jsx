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
            let response = await apiFetch("usuario/animais", "get")
            if (response.data != undefined) {
                setAnimais(response.data);
            } else {
                alert("Por Favor Tente mais tarde...")
            }
        }

        getAnimais();

    }, [animais]);

    const handleDelete = async (id_animal) => {

        let response = await apiFetch(`animais/${id_animal}`, "delete")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.data === 1) {
            alert('Excluído com Sucesso !!')
            setAnimais((prev) => prev.filter((animal) => animal.id_animal != id_animal))
        }

    }

    const handleAdotado = async (id_animal, adotado) => {

        console.log(adotado == 1 ? 0 : 1)

        let response = await apiFetch(`animais/${id_animal}/adotado`, "patch", {
            adotado: adotado == 1 ? 0 : 1
        })

        console.log("🚀 ~ file: MeusAnimais.jsx:47 ~ handleAdotado ~ response:", response)

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {
            alert('Adotado com Sucesso !!')
        }

    }

    const handleDesativar = async (id_animal) => {

        console.log("🚀 ~ file: MeusAnimais.jsx:64 ~ handleDesati ~ id_animal:", id_animal)

        let response = await apiFetch(`animais/desativar/${id_animal}`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {
            alert('Desativado com Sucesso !!')
        }

    }

    const handleAtivar = async (id_animal) => {

        console.log("🚀 ~ file: MeusAnimais.jsx:80 ~ handleAti ~ id_animal:", id_animal)

        let response = await apiFetch(`animais/ativar/${id_animal}`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {
            alert('Ativado com Sucesso !!')
        }

    }

    return (
        <>
            <h1>Meu Animais</h1>

            <NavBar />

            {loadingApi ? <h1>Carregando........</h1> :
                animais.length == 0 ? <h1>Sem Animais...</h1> : animais.map((animal) => {
                    return (

                        <div key={animal.id_animal}>
                            <AnimaisList
                                id_animal={animal.id_animal}
                                dt_inativacao={animal.dt_inativacao}
                                nome={animal.nome}
                                adotado={animal.adotado}
                                usuario={animal.usuario.nome}
                                sexo={animal.sexo}
                                descricao={animal.descricao}
                                categoria={animal.categoria.descricao}
                                idade={animal.idade}
                                porte={animal.porte.descricao}
                                fotos={animal.fotos}
                                handleDelete={handleDelete}
                                handleAdotado={handleAdotado}
                                handleDesativar={handleDesativar}
                                handleAtivar={handleAtivar}
                            />
                        </div>

                    )
                })}
        </>
    )


}

export default MeusAnimais;
