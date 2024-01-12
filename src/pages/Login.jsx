import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";
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

      {/* <NavBar /> */}

      <div className="bg-[#F5F5F5] h-screen flex flex-col justify-center items-center">

        <div className="bg-[#FFFFFF] shadow-lg p-6 w-[100%] rounded flex flex-col justify-center items-center md:w-96 md:h-1/2">

          <div className="w-[100%]">

            <h1 className="text-center mb-10 text-4xl font-extrabold">Login</h1>

            <label className="label-padrao">
              E-mail
            </label>
            <input
              className="input-padrao"
              type="text"
              placeholder="Preencha seu e-mail..."
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
              placeholder="Preencha sua senha..."
              value='123321'
              {...register("password", { required: true })}
            />
            {errosApi.erro?.password && <ErrosField errosApi={errosApi} field='password' />}
            {errors.password && MessageValidation('senha', errors.password.type)}

            {
              errosApi.code == 401 ? <p className="erro-mensagem">{errosApi.erro}</p> : ''
            }

            {
              loading ? <h1>Carregando...</h1> : (<>

                <button
                  className="
                bg-[#18AE58]
                w-[100%]
                text-white
                my-5
                p-2
                rounded
                font-bold
                tracking-wide
                "
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
