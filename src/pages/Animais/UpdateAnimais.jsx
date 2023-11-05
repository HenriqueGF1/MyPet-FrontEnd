import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";

function UpdateAnimais() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`animais/71`, "get")
            return {
                id_animal: response.data.id_animal,
                nome: response.data.nome,
                descricao: response.data.descricao,
                idade: response.data.idade,
                sexo: response.data.sexo,
                id_categoria: response.data.id_categoria,
                id_porte: response.data.id_porte,
            }
        }
    });

    const edit = async (data) => {

        // await api
        //     .patch(`animais/${data.id_animal}`, data)
        //     .then(function (response) {
        //         if (response.status == 200) {
        //             navigate("/animais");
        //         } else {
        //             setErrosApi(response.data.errors);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log("🚀 ~ file: UpdateAnimais.jsx:62 ~ edit ~ error:", error)
        //         setErrosApi(error.response.data)
        //     });

        let response = await apiFetch(`animais/${data.id_animal}`, "patch", data)

        if (response.code == 200) {
            navigate("/animais");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    if (loadingApi) {
        return <h1>Carregando.......</h1>
    }

    return (
        <>
            <h1>Editar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(edit)} id="editAnimal">

                <Input
                    label='Nome'
                    typeInput='text'
                    placeholder='Preencha seu nome'
                    name='nome'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.nome}
                />

                <Input
                    label='Descrição'
                    typeInput='text'
                    placeholder='Preencha sua Descrição'
                    name='descricao'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.descricao}
                />

                <Input
                    label='Idade'
                    typeInput='date'
                    placeholder='Preencha sua Idade'
                    name='idade'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.idade}
                />

                <Input
                    label='Sexo'
                    typeInput='text'
                    placeholder='Preencha seu Sexo'
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.sexo}
                />

                <PorteAnimal
                    label="Porte Animal"
                    name="id_porte"
                    register={register}
                // valorDefinido={id_porte}
                />

                <Categorias
                    label="Categorias"
                    name="id_categoria"
                    register={register}
                // valorDefinido={id_categoria}
                />

                {/* <Input
                    label='Imagens'
                    typeInput='file'
                    name='imagens[]'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                   apiErros={errosApi}
                /> */}

                <br />
                <button type="submit">Enviar</button>
            </form>

            <br />
            <br />
        </>
    );
}

export default UpdateAnimais;
