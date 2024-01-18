import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import MessageValidation from "../../../components/Validation/MessageValidation";
import ErrosField from "../../../components/Validation/errosField";
import buscarCep from "../../../services/buscaCep";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import limparNumeros from "../../../helpers/limparNumeros";
import retornoCep from "../../../helpers/retornoCep";

function CreateContato() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        data.cep = limparNumeros(data.cep)

        let response = await apiFetch(`enderecos`, "post", data)

        if (response.code == 201) {
            navigate("/usuarios/enderecos");
            return
        }

        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })
    };

    const handleCep = async (cep, bairro, complemento) => {

        let cepResultado = await retornoCep(cep, bairro, complemento)

        if (cepResultado === undefined) return

        setValue("bairro", cepResultado.neighborhood, {
            shouldValidate: true,
        })

        const complementoValue = `${cepResultado.street} ${cepResultado.neighborhood} ${cepResultado.city}-${cepResultado.state}`

        setValue("complemento", complementoValue, {
            shouldValidate: true,
        })

    }

    return (
        <>
            <NavBar />

            <form onSubmit={handleSubmit(create)}>

                <div className="bg-[--color-fundo] w-[100%] h-screen flex flex-col justify-center items-center">

                    <div className="bg-[--color-card] w-[95%] lg:w-1/2 my-5 p-3 rounded shadow-2xl">
                        <div>
                            <h1 className="text-center text-3xl font-bold p-3 my-5">Cadastrar Endereço</h1>
                        </div>

                        <div>

                            <div className="flex items-start">

                                <div className="p-3">

                                    <label className="label-padrao">
                                        Cep
                                    </label>
                                    <InputMask
                                        className="input-padrao"
                                        type="text"
                                        placeholder="Seu cep"
                                        id="cep"
                                        mask="99999-999"
                                        {...register("cep", { required: true })}
                                        onChange={() => {
                                            handleCep('cep', 'bairro', 'complemento')
                                        }
                                        }
                                    />
                                    {errosApi.erro?.cep && <ErrosField errosApi={errosApi} field='cep' />}
                                    {errors.cep && MessageValidation('cep', errors.cep.type)}

                                </div>

                                <div className="p-3">

                                    <label className="label-padrao">
                                        Bairro
                                    </label>
                                    <input
                                        className="input-padrao"
                                        id="bairro"
                                        type="text"
                                        placeholder="Seu bairro"
                                        {...register("bairro", { required: true })}
                                    />
                                    {errosApi.erro?.bairro && <ErrosField errosApi={errosApi} field='bairro' />}
                                    {errors.bairro && MessageValidation('bairro', errors.bairro.type)}

                                </div>

                                <div className="p-3">

                                    <label className="label-padrao">
                                        Número
                                    </label>
                                    <input
                                        className="input-padrao"
                                        type="text"
                                        placeholder='Seu número'
                                        {...register("numero_endereco", { required: true })}
                                    />
                                    {errosApi.erro?.numero_endereco && <ErrosField errosApi={errosApi} field='numero_endereco' />}
                                    {errors.numero_endereco && MessageValidation('número', errors.numero_endereco.type)}

                                </div>

                            </div>

                            <div className="flex items-start">
                                
                                <div className="p-3">

                                    <label className="label-padrao">
                                        Complemento de Endereço
                                    </label>
                                    <textarea
                                        className="input-padrao"
                                        id="complemento"
                                        type="number"
                                        placeholder="Seu complemento de endereço"
                                        {...register("complemento", { required: true })}
                                        cols='100'
                                        rows='5'
                                    />
                                    {errosApi.erro?.complemento && <ErrosField errosApi={errosApi} field='complemento' />}
                                    {errors.complemento && MessageValidation('complemento', errors.complemento.type)}

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
