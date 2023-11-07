import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";

function CreateAnimal() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let animalData = new FormData(document.getElementById("createAnimal"));

        // await api
        //     .post(`animais`,
        //         animalData
        //     )
        //     .then(function (response) {

        //         if (response.status == 201) {
        //             navigate("/usuario/animais");
        //         } else {
        //             setErros(response.data.errors);
        //         }

        //     })
        //     .catch(function (error) {
        //         console.log("🚀 ~ file: CreateAnimal.jsx:85 ~ create ~ error:", error)
        //         setErros(error.response.data.errors)
        //         // setLoading(false);
        //     });
        // return

        let response = await apiFetch(`animais`, "post", animalData)

        console.log("🚀 ~ file: CreateAnimal.jsx:49 ~ create ~ response:", response)

        if (response.code == 201) {
            navigate("/usuario/animais");
        } else {
            // alert(response.data.message)
            setErrosApi(response.data.errors);
        }
    }

    console.log(errosApi)

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

                <Input
                    label='Imagens'
                    typeInput='file'
                    name='imagens[]'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.imagens}
                />

                <br />

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

export default CreateAnimal;
