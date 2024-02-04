import ErrosField from "../components/Validation/errosField";
import Footer from "../components/Footer/Footer";
import MessageValidation from "../components/Validation/MessageValidation";
import NavBar from "../components/NavBar/NavBar";
import { Context } from "../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useContext } from "react";

function Login() {
  let navigate = useNavigate();
  const { loading, handleLogin, handleLogout } = useContext(Context);
  const [errosApi, setErrosApi] = useState({
    status: "",
    erro: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (data) => {
    const { response } = await handleLogin(data);

    if (response.status === 200) {
      navigate("/");
      return;
    }

    setErrosApi({
      status: response.status,
      erro: response.data.errors,
    });
  };

  return (
    <>
      <NavBar />

      <div className="w-[100%] h-screen flex flex-col justify-center items-center lg:flex-row">
        <div className="shadow-2xl rounded w-[90%] md:w-[800px] h-[500px] flex flex-col items-center justify-between lg:flex-row">
          <div className="w-[500px] h-[500px] hidden lg:block">
            <img
              className="w-[100%] h-[500px] object-cover"
              src="../../public/01.png"
              alt=""
            />
          </div>

          <div className="w-[100%] md:w-[500px] h-[400px] flex flex-col items-center justify-evenly">
            <div>
              <h1 className="text-4xl text-center">Login</h1>
            </div>

            <div className="w-[90%]">
              <label
                className={
                  errosApi.erro?.email || errors.email
                    ? "label-erro"
                    : "label-padrao"
                }
              >
                E-mail
              </label>
              <input
                className={
                  errosApi.erro?.email || errors.email
                    ? "input-erro"
                    : "input-padrao"
                }
                type="text"
                placeholder="Preencha seu e-mail"
                // value="henrique@gmail.com"
                {...register("email", { required: true })}
              />
              {errosApi.erro?.email && (
                <ErrosField errosApi={errosApi} field="email" />
              )}
              {errors.email && MessageValidation("email", errors.email.type)}

              <label
                className={
                  errosApi.erro?.password || errors.password
                    ? "label-erro"
                    : "label-padrao"
                }
              >
                Senha
              </label>
              <input
                className={
                  errosApi.erro?.password || errors.password
                    ? "input-erro"
                    : "input-padrao"
                }
                type="text"
                placeholder="Preencha sua senha"
                // value="123321"
                {...register("password", { required: true })}
              />
              {errosApi.erro?.password && (
                <ErrosField errosApi={errosApi} field="password" />
              )}
              {errors.password &&
                MessageValidation("senha", errors.password.type)}

              {errosApi.status == 401 ? (
                <p className="erro-mensagem">{errosApi.erro}</p>
              ) : (
                ""
              )}

              <p className="text-sm text-center text-gray-500 my-5">
                Não tem uma conta?{" "}
                <Link to="/create" className="underline">
                  Criar Conta
                </Link>
              </p>

              {loading ? (
                <div className="w-[100%] font-semibold my-5 flex justify-center items-center">
                  <h1>Carregando...</h1>
                </div>
              ) : (
                <>
                  <button
                    className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black w-[100%]"
                    onClick={() => handleSubmit(login)()}
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Login;
