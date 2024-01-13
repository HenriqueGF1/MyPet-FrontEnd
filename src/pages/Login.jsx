import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import MessageValidation from "../components/Validation/MessageValidation";
import ErrosField from "../components/Validation/errosField";

function Login() {

  let navigate = useNavigate();
  const { loading, handleLogin, handleLogout } = useContext(Context);
  const [errosApi, setErrosApi] = useState([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {

    const { response } = await handleLogin(data)

    if (response.status === 200) {
      navigate("/home");
      return
    }

    response.status == 401 ? setErrosApi({
      "code": response.status,
      "erro": response.data.data,
    }) : setErrosApi({
      "code": response.status,
      "erro": response.data.errors,
    })
  }

  return (
    <>

      <NavBar />

      <div className="bg-[--color-fundo] h-screen flex justify-center items-center">

        <div className="bg-[--color-card] p-5 w-[90%] lg:w-[500px] h-[50%] rounded shadow-lg flex flex-col justify-evenly">

          <h1 className="text-center text-4xl font-bold p-3">Login</h1>

          <div>
            <label className="label-padrao">
              E-mail
            </label>
            <input
              className="input-padrao"
              type="text"
              placeholder="Preencha seu e-mail"
              value='henrique@gmail.com'
              {...register("email", { required: true })}
            />
            {errosApi.erro?.email && <ErrosField errosApi={errosApi} field='email' />}
            {errors.email && MessageValidation('email', errors.email.type)}

            <label className="label-padrao">
              Senha
            </label>
            <input
              className="input-padrao"
              type="text"
              placeholder="Preencha sua senha"
              value='123321'
              {...register("password", { required: true })}
            />
            {errosApi.erro?.password && <ErrosField errosApi={errosApi} field='password' />}
            {errors.password && MessageValidation('senha', errors.password.type)}

            {
              errosApi.code == 401 ? <p className="erro-mensagem">{errosApi.erro}</p> : ''
            }

            <p className="my-3 text-center text-gray-400">Não tem uma conta? <Link to='/create' className="underline">Criar Conta</Link></p>

            {
              loading ? <h1>Carregando...</h1> : (<>

                <button
                  className="botao text-white bg-[--color-principal] hover:bg-[--color-secundaria] hover:text-white w-[100%] my-3"
                  onClick={() => handleSubmit(login)()}
                >Login</button>

              </>)
            }
          </div>

        </div>

      </div>
    </>
  );
}

export default Login;
