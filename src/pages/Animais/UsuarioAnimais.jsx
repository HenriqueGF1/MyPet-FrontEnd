import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisList from "../../components/Animais/AnimaisList";

import { toast } from 'react-toastify';

function UsuarioAnimais() {

    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch("usuario/animais", "get")
            console.log("🚀 ~ file: UsuarioAnimais.jsx:17 ~ getAnimais ~ response:", response)
            if (response.data != undefined) {
                setAnimais(response.data);
            }
        }

        getAnimais();

    }, []);

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

        const adotar = adotado == 1 ? 0 : 1;

        let response = await apiFetch(`animais/${id_animal}/adotado`, "patch", {
            adotado: adotar
        })

        if (response.data.code == 400) {
            // alert(response.data.message)
            toast.warn(response.data.message);
        }

        if (response.code === 200) {

            const animal = animais.map(animal =>
                animal.id_animal === id_animal
                    ? { ...animal, adotado: adotar }
                    : animal
            );

            setAnimais(
                prev => animal
            );

            toast.success("Adotado com Sucesso !!");
        }

    }

    const handleDesativar = async (id_animal) => {

        let response = await apiFetch(`animais/desativar/${id_animal}`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {

            const animal = animais.map(animal =>
                animal.id_animal === id_animal
                    ? { ...animal, dt_inativacao: response.data.data.dt_inativacao }
                    : animal
            );

            setAnimais(
                prev => animal
            );

            toast.success("Desativado com Sucesso !!");
        }

    }

    const handleAtivar = async (id_animal) => {

        console.log("🚀 ~ file: UsuarioAnimais.jsx:80 ~ handleAti ~ id_animal:", id_animal)

        let response = await apiFetch(`animais/ativar/${id_animal}`, "patch")

        if (response.data.code == 400) {
            alert(response.data.message)
        }

        if (response.code === 200) {

            const animal = animais.map(animal =>
                animal.id_animal === id_animal
                    ? { ...animal, dt_inativacao: response.data.data.dt_inativacao }
                    : animal
            );

            setAnimais(
                prev => animal
            );

            alert('Ativado com Sucesso !!')
        }

    }

    return (
        <>
            <h1>Meu Animais</h1>

            <NavBar />

            {
                loadingApi ? <h1>Carregando........</h1> : ''
            }

            {animais.length == 0 ? <h1>Sem Animais...</h1> : animais.map((animal) => {
                return (

                    <div key={animal.id_animal}>
                        <AnimaisList
                            id_animal={animal.id_animal}
                            dt_inativacao={animal.dt_inativacao}
                            nome={animal.nome}
                            adotado={animal.adotado}
                            usuario={animal.usuario}
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

export default UsuarioAnimais;
