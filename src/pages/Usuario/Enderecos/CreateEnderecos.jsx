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

        if(cepResultado === undefined) return
        
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
            <h1>Cadastrar Endereço</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)}>

                <div className="form-group">
                    <label>Cep</label><br></br>
                    <InputMask
                        type="text"
                        placeholder="Preencha seu cep"
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

                <div className="form-group" >
                    <label>Bairro</label><br></br>
                    <input
                        id="bairro"
                        type="text"
                        placeholder="Preencha seu cep"
                        {...register("bairro", { required: true })}
                    />
                    {errosApi.erro?.bairro && <ErrosField errosApi={errosApi} field='bairro' />}
                    {errors.bairro && MessageValidation('bairro', errors.bairro.type)}
                </div>

                <div className="form-group">
                    <label>Número</label><br></br>
                    <input
                        type="text"
                        placeholder='Preencha seu Número'
                        {...register("numero_endereco", { required: true })}
                    />
                    {errosApi.erro?.numero_endereco && <ErrosField errosApi={errosApi} field='numero_endereco' />}
                    {errors.numero_endereco && MessageValidation('número', errors.numero_endereco.type)}
                </div>

                <div className="form-group">
                    <label>Complemento de Endereço</label><br></br>
                    <textarea
                        id="complemento"
                        type="number"
                        placeholder="Preencha seu complemento de endereço"
                        {...register("complemento", { required: true })}
                        rows='10'
                        cols='50'
                    />
                    {errosApi.erro?.complemento && <ErrosField errosApi={errosApi} field='complemento' />}
                    {errors.complemento && MessageValidation('complemento', errors.complemento.type)}
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
        </>
    );
}

export default CreateContato;
