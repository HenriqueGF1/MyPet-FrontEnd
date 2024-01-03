import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import ErrosField from "../../components/Validation/errosField";
import MessageValidation from "../../components/Validation/MessageValidation";

function LoginAdm() {
  const { authenticated, loading, handleLoginAdm, handleLogout } = useContext(Context);
  let navigate = useNavigate();
  const [errosApi, setErrosApi] = useState({})

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const login = async (data) => {

    const { response } = await handleLoginAdm(data)

    if (response.code == 200) {
      navigate("/home");
      return
    }

    setErrosApi({
      "code": response.code,
      "erro": response.data.errors,
    })

  }

  return (
    <>
      <h1>Login para Administradores</h1>

      <NavBar />

      <form onSubmit={handleSubmit(login)} id='loginADM'>

        <div className="form-group">
          <label>E-mail</label><br></br>
          <input
            type="text"
            placeholder="Preencha seu e-mail"
            value='henrique@gmail.com'
            {...register("email", { required: true })}
          />
          {errosApi.erro?.email && <ErrosField errosApi={errosApi} field='email' />}
          {errors.email && MessageValidation('email', errors.email.type)}
        </div>

        <div className="form-group">
          <label>Senha</label><br></br>
          <input
            type="text"
            placeholder="Preencha seu senha"
            value='123321'
            {...register("password", { required: true })}
          />
          {errosApi.erro?.password && <ErrosField errosApi={errosApi} field='password' />}
          {errors.password && MessageValidation('password', errors.password.type)}
        </div>

        {
          loading ? <h1>Carregando...</h1> : (<>

            <div className="form-group">
              <button type="submit">Enviar</button>
              <button type="reset">Cancelar</button>
              <button onClick={handleLogout}>Sair</button>
            </div>

          </>)
        }

      </form>
    </>
  );
}

export default LoginAdm;
