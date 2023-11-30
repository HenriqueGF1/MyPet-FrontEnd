import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import NavBar from "../../components/NavBar/NavBar";
import AnimaisList from "../../components/Animais/AnimaisList";
import Loading from '../../components/Loading/Loading'

import { toast } from 'react-toastify';

function UsuarioAnimais() {

    const [animais, setAnimais] = useState([]);
    const [erros, setErros] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch("usuario/animais", "get")
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
            toast.warning(response.data.message);
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

            let message = adotar == 1 ? "Adotado com Sucesso !!" : "Animal disponível novamente para a adoção"

            toast.success(message)
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

        let response = await apiFetch(`animais/ativar/${id_animal}`, "patch")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
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

            toast.success("Ativado com Sucesso !!");
        }

    }

    return (
        <>
            <h1>Meu Animais</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : animais.length > 0 ? (
                animais.map((animal) => (
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
                ))
            ) : (
                <h1>Sem Animais</h1>
            )}
        </>
    )


}

export default UsuarioAnimais;
