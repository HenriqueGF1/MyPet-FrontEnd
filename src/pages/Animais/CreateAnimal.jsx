import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";


function CreateAnimal() {

    let navigate = useNavigate();

    const [erros, setErros] = useState([])

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let animalData = new FormData(document.getElementById("createAnimal"));

        await api
            .post(`animais`,
                animalData
            )
            .then(function (response) {

                if (response.status == 201) {
                    navigate("/animais");
                } else {
                    setErros(response.data.errors);
                }

            })
            .catch(function (error) {
                console.log("🚀 ~ file: CreateAnimal.jsx:85 ~ create ~ error:", error)
                setErros(error.response.data.errors)
                // setLoading(false);
            });

        return
    }

    return (
        <>

            <h1>Criar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createAnimal'>

                <Input
                    label='Nome'
                    typeInput='text'
                    placeholder='Preencha seu nome'
                    name='nome'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <Input
                    label='Descrição'
                    typeInput='text'
                    placeholder='Preencha sua Descrição'
                    name='descricao'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <PorteAnimal
                    label="Porte Animal"
                    name="id_porte"
                    register={register}
                    erros={erros}
                />

                <Categorias
                    label="Categorias"
                    name="id_categoria"
                    register={register}
                    erros={erros}
                />

                <Input
                    label='Idade'
                    typeInput='date'
                    placeholder='Preencha sua Idade'
                    name='idade'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <Input
                    label='Sexo'
                    typeInput='text'
                    placeholder='Preencha seu Sexo'
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                {/* {loading ? <h1>Carregando****</h1> : (

                    <>

                        <Select
                            label='Categoria'
                            name='id_categoria'
                            register={register}
                            arrayValues={categorias}
                            valueId='id_categoria'
                            valueText='descricao'
                            apiErros={erros}
                        />

                        <Select
                            label='Porte'
                            name='id_porte'
                            register={register}
                            arrayValues={porte}
                            valueId='id_porte'
                            valueText='descricao'
                            apiErros={erros}
                        />

                    </>
                )} */}

                <Input
                    label='Imagens'
                    typeInput='file'
                    name='imagens[]'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <br />

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

export default CreateAnimal;
