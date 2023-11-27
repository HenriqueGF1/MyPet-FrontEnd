import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { useParams } from 'react-router-dom';
import Loading from "../../../components/Loading/Loading";

function UpdateContato() {

    let navigate = useNavigate();

    let { id_contato } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`contatos/${id_contato}`, "get")
            return {
                id_contato: response.data.id_contato,
                dd: response.data.dd,
                numero: response.data.numero,
                principal: response.data.principal
            }
        }
    });

    const edit = async (data) => {

        console.log("🚀 ~ file: UpdateContato.jsx:39 ~ edit ~ data:", data)

        let response = await apiFetch(`contatos/${data.id_contato}`, "patch", data)

        if (response.code == 200) {
            navigate("/usuarios/contatos");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    return (
        <>
            <h1>Editar Contato</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>
                <form onSubmit={handleSubmit(edit)}>

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
            </>)}
        </>
    );
}

export default UpdateContato;
