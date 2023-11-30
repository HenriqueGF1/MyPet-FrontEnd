import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../components/Loading/Loading";

function UpdateAnimais() {

    let navigate = useNavigate();

    let { id_animal } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`animais/${id_animal}`, "get")
            return {
                id_animal: response.data.id_animal,
                nome: response.data.nome,
                descricao: response.data.descricao,
                idade: response.data.idadeEUA,
                sexo: response.data.sexo,
                id_categoria: response.data.id_categoria,
                id_porte: response.data.id_porte,
            }
        }
    });

    const edit = async (data) => {

        let response = await apiFetch(`animais/${data.id_animal}`, "patch", data)

        if (response.code == 200) {
            toast.success('Editado com Sucesso !!')
            navigate("/animais");
        } else {
            setErrosApi(response.data.errors);
            // toast.warning('Atenção');
        }

    };

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

                <label htmlFor="">Sexo</label>
                <br /><br />

                <Input
                    label='M'
                    typeInput='radio'
                    value="M"
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.sexo}
                />

                <Input
                    label='F'
                    typeInput='radio'
                    value="F"
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
                />

                <Categorias
                    label="Categorias"
                    name="id_categoria"
                    register={register}
                />

                <br />
                <button type="submit">Enviar</button>
            </form>

            <br />
            <br />

        </>
    );
}

export default UpdateAnimais;
