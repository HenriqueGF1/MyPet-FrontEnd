import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { toast } from "react-toastify";
import ErrosField from "../../../components/Validation/errosField";
import MessageValidation from "../../../components/Validation/MessageValidation";

function CreateDenunciaResposta() {

    let navigate = useNavigate();

    let { id_denuncia } = useParams();
    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const create = async (data) => {

        let dados = {
            id_denuncia: id_denuncia,
            aceite: data.aceite,
            resposta: data.resposta,
        }

        let response = await apiFetch(`admin/denuncias/respostas`, "post", dados)

        if (response.code == 201) {
            toast.success(`Respondida com sucesso !!!`)
            navigate("/admin/denuncias");
            return
        }

        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })

    }

    return (
        <>

            <h1>ADM Responder Denuncia</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createDenunciaResposta'>

                <div className="form-group">
                    <label>Aceite</label><br></br>

                    <br></br><label>Sim</label><br></br>
                    <input
                        type="radio"
                        value="1"
                        {...register("aceite", { required: true })}
                    />
                    {errosApi.erro?.aceite && <ErrosField errosApi={errosApi} field='aceite' />}
                    {errors.aceite && MessageValidation('aceite', errors.aceite.type)}

                    <br></br><label>Não</label><br></br>
                    <input
                        type="radio"
                        value="0"
                        {...register("aceite", { required: true })}
                    />
                    {errosApi.erro?.aceite && <ErrosField errosApi={errosApi} field='aceite' />}
                    {errors.aceite && MessageValidation('aceite', errors.aceite.type)}
                </div>

                <br />

                <div className="form-group">
                    <label>Resposta</label><br></br>
                    <textarea
                    rows='5'
                    cols='50'
                        type="text"
                        placeholder='Preencha sua Resposta'
                        {...register("resposta", { required: true })}
                    />
                    {errosApi.erro?.resposta && <ErrosField errosApi={errosApi} field='resposta' />}
                    {errors.resposta && MessageValidation('resposta', errors.resposta.type)}
                </div>

                <br />

                {
                    loadingApi ? <h1>Carregando...</h1> : (<>

                        <div className="form-group">
                            <button type="submit">Enviar</button>
                            <button type="reset">Cancelar</button>
                        </div>

                    </>)
                }

            </form>

            <br /><br />

        </>
    );
}

export default CreateDenunciaResposta;
