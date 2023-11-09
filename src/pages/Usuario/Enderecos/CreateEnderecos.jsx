import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";

function CreateContato() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        console.log("🚀 ~ file: CreateEnderecos.jsx:22 ~ create ~ data:", data)

        let response = await apiFetch(`enderecos`, "post", data)

        console.log("🚀 ~ file: CreateEnderecos.jsx:27 ~ create ~ response:", response)

        if (response.code == 201) {
            navigate("/usuarios/1/enderecos");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    return (
        <>
            <h1>Cadastrar Endereço</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)}>

                <Input
                    label='CEP'
                    typeInput='text'
                    placeholder='Preencha seu CEP'
                    name='cep'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.cep}
                />

                <Input
                    label='Numero'
                    typeInput='number'
                    placeholder='Preencha seu Número'
                    name='numero_endereco'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.numero_endereco}
                />

                <Input
                    label='Bairro'
                    typeInput='text'
                    placeholder='Preencha seu Bairro'
                    name='bairro'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.bairro}
                />

                <Input
                    label='Complemento'
                    typeInput='text'
                    placeholder='Preencha seu Complemento'
                    name='complemento'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.complemento}
                />

                <br />
                <button type="submit">Enviar</button>
            </form>

            <br />
            <br />
        </>
    );
}

export default CreateContato;
