import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { toast } from "react-toastify";
import MessageValidation from "../components/Validation/MessageValidation";
import ErrosField from "../components/Validation/errosField";
import buscarCep from "../services/buscaCep";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import limparNumeros from "../helpers/limparNumeros";
import retornoCep from "../helpers/retornoCep";

function CriarConta() {
    let navigate = useNavigate();
    const [errosApi, setErrosApi] = useState({})
    const { authenticated, loading, handleCreate } = useContext(Context);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        data.dd = limparNumeros(data.dd)
        // data.numero = limparNumeros(data.numero)
        data.cep = limparNumeros(data.cep)

        const { response } = await handleCreate(data)

        if (response.status == 200) {
            toast.success('Bem vindo a plataforma')
            navigate("/login");
        } else {
            setErrosApi({
                "code": response.code,
                "erro": response.data.errors,
            })
        }
    }

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
            <h1>Criar Conta</h1>

            <NavBar />

            <div className="app-container">

                <form onSubmit={handleSubmit(create)} id='createUsuario'>

                    <h3>Infirmações Pessoais</h3>

                    <div className="form-group">
                        <label>Nome</label><br></br>
                        <input
                            type="text"
                            placeholder="Preencha seu nome..."
                            {...register("nome", { required: true })}
                        />
                        {errosApi.erro?.nome && <ErrosField errosApi={errosApi} field='nome' />}
                        {errors.nome && MessageValidation('nome', errors.nome.type)}
                    </div>

                    <div className="form-group">
                        <label>E-mail</label><br></br>
                        <input
                            type="text"
                            placeholder="Preencha seu e-mail"
                            {...register("email", { required: true })}
                        />
                        {errosApi.erro?.email && <ErrosField errosApi={errosApi} field='email' />}
                        {errors.email && MessageValidation('email', errors.email.type)}
                    </div>

                    <div className="form-group">
                        <label>Senha</label><br></br>
                        <input
                            type="text"
                            placeholder="Preencha sua senha"
                            {...register("password", { required: true })}
                        />
                        {errosApi.erro?.password && <ErrosField errosApi={errosApi} field='password' />}
                        {errors.password && MessageValidation('password', errors.password.type)}
                    </div>

                    <div className="form-group">
                        <label>Idade</label><br></br>
                        <input
                            type="date"
                            placeholder="Preencha sua idade"
                            {...register("idade", { required: true })}
                        />
                        {errosApi.erro?.idade && <ErrosField errosApi={errosApi} field='idade' />}
                        {errors.idade && MessageValidation('idade', errors.idade.type)}
                    </div>


                    <h3>Infirmações de Contato</h3>

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

                    <h3>Infirmações de Endereço</h3>

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
                        <label>Número de Endereço</label><br></br>
                        <input
                            type="number"
                            placeholder="Preencha seu número de endereço"
                            {...register("numero_endereco", { required: true })}
                        />
                        {errosApi.erro?.numero_endereco && <ErrosField errosApi={errosApi} field='numero_endereco' />}
                        {errors.numero_endereco && MessageValidation('número de endereço', errors.numero_endereco.type)}
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
                        loading ? <h1>Carregando...</h1> : (<>

                            <div className="form-group">
                                <button type="submit">Enviar</button>
                                <button type="reset">Cancelar</button>
                                <Link to="/login">
                                    <button>Login</button>
                                </Link>
                            </div>

                        </>)
                    }

                    <br /><br /><br /><br /><br />

                </form>

            </div>
        </>
    );
}

export default CriarConta;
