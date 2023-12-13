import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { toast } from "react-toastify";

function CreateDenunciaResposta() {

    let navigate = useNavigate();
    let { id_denuncia } = useParams();

    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let dados = {
            id_denuncia: id_denuncia,
            aceite: data.aceite,
            resposta: data.resposta,
        }

        let response = await apiFetch(`admin/denuncias/respostas`, "post", dados)

        console.log("🚀 ~ file: CreateDenunciaResposta.jsx:38 ~ create ~ response:", response)

        if (response.code == 201) {
            toast.success(`Respondida com sucesso !!!`)
            navigate("/admin/denuncias");
        } else {
            setErrosApi(response.data.errors);
        }
    }

    return (
        <>

            <h1>Responder Denuncia</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createDenunciaResposta'>

                <label htmlFor="">Aceite</label>
                <br /><br />

                <Input
                    label='Sim'
                    typeInput='radio'
                    value="1"
                    name='aceite'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.aceite}
                />

                <Input
                    label='Não'
                    typeInput='radio'
                    value="0"
                    name='aceite'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.aceite}
                />

                <br />

                <Input
                    label='Resposta'
                    typeInput='text'
                    placeholder='Preencha sua Resposta'
                    name='resposta'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.resposta}
                />

                <br />

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

export default CreateDenunciaResposta;
