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

                    <div className="bg-[--color-fundo] w-[100%] h-screen flex flex-col justify-center items-center">

                        <div className="bg-[--color-card] w-[95%] lg:w-1/2 my-5 p-3 rounded shadow-2xl">
                            <div>
                                <h1 className="text-center text-3xl font-bold p-3 my-5">Cadastrar Contato</h1>
                            </div>

                            <div>
                                <div className="flex items-start">

                                    <div className="p-3">

                                        <label className="label-padrao">
                                            DD
                                        </label>
                                        <InputMask
                                            className="input-padrao"
                                            type="text"
                                            placeholder="Preencha seu dd"
                                            mask="(99)"
                                            {...register("dd", { required: true })}
                                        />
                                        {errosApi.erro?.dd && <ErrosField errosApi={errosApi} field='dd' />}
                                        {errors.dd && MessageValidation('dd', errors.dd.type)}

                                    </div>

                                    <div className="p-3">

                                        <label className="label-padrao">
                                            Número de Telefone
                                        </label>
                                        <InputMask
                                            className="input-padrao"
                                            type="text"
                                            placeholder="Preencha seu número"
                                            mask="9999-9999"
                                            {...register("numero", { required: true })}
                                        />
                                        {errosApi.erro?.numero && <ErrosField errosApi={errosApi} field='numero' />}
                                        {errors.numero && MessageValidation('numero', errors.numero.type)}

                                    </div>

                                </div>

                                {
                                    loadingApi ? <h1>Carregando...</h1> : (<>

                                        <div className="w-[100%] my-3 flex justify-around">
                                            <button
                                                className="botao text-white bg-[--color-principal] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                                                type="submit"
                                            >Enviar</button>

                                            <button
                                                className="botao text-white bg-[--color-terciario] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                                                type="reset"
                                            >Cancelar</button>
                                        </div>

                                    </>)
                                }

                            </div>

                        </div>
                    </div>

                </form>
            </>)}
        </>
    );
}

export default UpdateContato;
