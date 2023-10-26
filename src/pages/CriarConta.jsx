import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../context/apiContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function CriarConta() {
    let navigate = useNavigate();
    const [erros, setErros] = useState([])
    const { authenticated, loading, handleCreate } = useContext(Context);

    const {
        register,
        handleSubmit
    } = useForm();

    const create = async (data) => {

        const { response } = await handleCreate(data)

        if (response.status == 200) {
            navigate("/home");
        } else {
            setErros(response.data.errors);
        }
    }


    return (
        <>
            <h1>Criar Conta</h1>

            <NavBar />

            <div className="app-container">
                <div className="form-group">
                    <label>Nome</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha seu nome..."
                        {...register("nome")}
                    />
                    {
                        erros?.nome?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>E-mail</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha seu e-mail..."
                        {...register("email")}
                    />
                    {
                        erros?.email?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Senha</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha sua senha..."
                        {...register("password")}
                    />
                    {
                        erros?.password?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Idade</label><br></br>
                    <input
                        type="date"
                        placeholder="Preencha sua idade..."
                        {...register("idade")}
                    />
                    {
                        erros?.idade?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>DD</label><br></br>
                    <input
                        type="number"
                        placeholder="Preencha seu dd..."
                        {...register("dd")}
                    />
                    {
                        erros?.dd?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Numero</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha seu numero..."
                        {...register("numero")}
                    />
                    {
                        erros?.numero?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Cep</label><br></br>
                    <input
                        type="number"
                        placeholder="Preencha seu cep..."
                        {...register("cep")}
                    />
                    {
                        erros?.cep?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Bairro</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha seu bairro..."
                        {...register("bairro")}
                    />
                    {
                        erros?.bairro?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Numero de Endereço</label><br></br>
                    <input
                        type="number"
                        placeholder="Preencha seu numero_endereco..."
                        {...register("numero_endereco")}
                    />
                    {
                        erros?.numero_endereco?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <div className="form-group">
                    <label>Complemento de Endereço</label><br></br>
                    <textarea
                        placeholder="Preencha seu complemento..."
                        {...register("complemento")}
                    />
                    {
                        erros?.complemento?.map((message, index) => {
                            return (
                                <p key={index} className="error-message">{message}</p>
                            )
                        })
                    }
                </div>
                <br></br>
                {
                    loading ? <h1>Carregando...</h1> : (<>
                        <div className="form-group">
                            <button onClick={() => handleSubmit(create)()}>Criar Conta</button>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </div>
                    </>)
                }
                <br /><br /><br /><br /><br />

            </div>
        </>
    );
}

export default CriarConta;
