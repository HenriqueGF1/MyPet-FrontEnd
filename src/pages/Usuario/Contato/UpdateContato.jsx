import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import { useParams } from 'react-router-dom';
import Loading from "../../../components/Loading/Loading";
import MessageValidation from "../../../components/Validation/MessageValidation";
import ErrosField from "../../../components/Validation/errosField";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import limparNumeros from "../../../helpers/limparNumeros";
import { toast } from "react-toastify";

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

        data.dd = limparNumeros(data.dd)

        let response = await apiFetch(`contatos/${data.id_contato}`, "patch", data)

        if (response.code == 200) {
            toast.success('Editado com sucesso !!')
            navigate("/usuarios/contatos");
        } else {
            setErrosApi({
                "code": response.code,
                "erro": response.data.errors,
            })
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

                    <div className="form-group">
                        <label>DD</label><br></br>
                        <InputMask
                            type="text"
                            placeholder="Preencha seu dd"
                            mask="(99)"
                            {...register("dd", { required: true })}
                        />
                        {errosApi.erro?.dd && <ErrosField errosApi={errosApi} field='dd' />}
                        {errors.dd && MessageValidation('dd', errors.dd.type)}
                    </div>

                    <div className="form-group">
                        <label>Número de Telefone</label><br></br>
                        <InputMask
                            type="text"
                            placeholder="Preencha seu número"
                            mask="9999-9999"
                            {...register("numero", { required: true })}
                        />
                        {errosApi.erro?.numero && <ErrosField errosApi={errosApi} field='numero' />}
                        {errors.numero && MessageValidation('numero', errors.numero.type)}
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

                <br />
                <br />
            </>)}
        </>
    );
}

export default UpdateContato;
