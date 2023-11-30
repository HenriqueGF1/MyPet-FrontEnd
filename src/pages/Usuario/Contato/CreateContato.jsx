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

        let response = await apiFetch(`contatos`, "post", data)

        if (response.code == 201) {
            navigate("/usuarios/contatos");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    return (
        <>
            <h1>Cadastrar Contato</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)}>

                <Input
                    label='DD'
                    typeInput='text'
                    placeholder='Preencha seu DD'
                    name='dd'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.dd}
                />

                <Input
                    label='Numero'
                    typeInput='text'
                    placeholder='Preencha seu Número'
                    name='numero'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.numero}
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
