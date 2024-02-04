import ErrosField from "../../components/Validation/errosField";
import MessageValidation from "../../components/Validation/MessageValidation";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/Context";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

function LoginAdm() {
  const { authenticated, loading, handleLoginAdm, handleLogout } =
    useContext(Context);
  let navigate = useNavigate();
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
    const { response } = await handleLoginAdm(data);

    if (response.data.code == 200) {
      navigate("/admin/dashBoard");
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
        <div className="shadow-2xl rounded w-[100%] md:w-[50%] flex flex-col items-center justify-center lg:flex-row">
          <div className="w-[100%] md:h-[450px] p-3 flex flex-col items-center justify-evenly">
            <div>
              <h1 className="text-4xl text-center">
                Login para Administradores
              </h1>
            </div>

            <div className="w-[90%]">
              <form onSubmit={handleSubmit(login)} id="loginADM">
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
                  // value="henrique@gmail.co"
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

                <div className="my-5">
                  {loading ? (
                    <div className="w-[100%] font-semibold my-5 flex justify-center items-center">
                      <h1>Carregando...</h1>
                    </div>
                  ) : (
                    <>
                      <button className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black w-[100%]">
                        Login
                      </button>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginAdm;
