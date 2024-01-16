import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import MessageValidation from "../../../components/Validation/MessageValidation";
import ErrosField from "../../../components/Validation/errosField";
import { toast } from "react-toastify";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import limparNumeros from "../../../helpers/limparNumeros";

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

        data.dd = limparNumeros(data.dd)

        let response = await apiFetch(`contatos`, "post", data)

        if (response.code == 201) {
            toast.success('Cadastrado com sucesso !!')
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



            <NavBar />

            <form onSubmit={handleSubmit(create)}>

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
        </>
    );
}

export default CreateContato;
