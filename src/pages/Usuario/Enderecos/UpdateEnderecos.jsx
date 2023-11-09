import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { useParams } from 'react-router-dom';

function UpdateEnderecos() {

    let navigate = useNavigate();

    let { id_endereco } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`enderecos/${id_endereco}`, "get")
            return {
                id_endereco: response.data.id_endereco,
                cep: response.data.cep,
                numero_endereco: response.data.numero,
                complemento: response.data.complemento,
                bairro: response.data.bairro,
            }
        }
    });

    const edit = async (data) => {

        console.log("🚀 ~ file: UpdateEnderecos.jsx:39 ~ edit ~ data:", data)

        let response = await apiFetch(`enderecos/${data.id_endereco}`, "patch", data)

        console.log("🚀 ~ file: UpdateEnderecos.jsx:40 ~ edit ~ response:", response)

        if (response.code == 200) {
            navigate("/usuarios/1/enderecos");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    if (loadingApi) {
        return <h1>Carregando.......</h1>
    }

    return (
        <>
            <h1>Editar Endereços</h1>

            <NavBar />

            <form onSubmit={handleSubmit(edit)}>

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
                    apiErros={errosApi.numero}
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

export default UpdateEnderecos;
