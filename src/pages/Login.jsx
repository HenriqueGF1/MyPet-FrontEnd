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
      <h1>Login</h1>

      <NavBar />

      <div className="app-container">

        <div className="form-group">
          <label>E-mail</label><br></br>
          <input
            type="text"
            placeholder="Preencha seu e-mail..."
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
            placeholder="Preencha sua senha..."
            value='123321'
            {...register("password", { required: true })}
          />
          {errosApi.erro?.password && <ErrosField errosApi={errosApi} field='password' />}
          {errors.password && MessageValidation('senha', errors.password.type)}
        </div>

        <div className="form-group">
          {
            errosApi.code == 401 ? <p className="error-message">{errosApi.erro}</p> : ''
          }
        </div>

        <br></br>

        {
          loading ? <h1>Carregando...</h1> : (<>

            <div className="form-group">
              <button onClick={() => handleSubmit(login)()}>Login</button>
              <button type="reset">Cancelar</button>
              <button onClick={handleLogout}>Sair</button>
            </div>

          </>)
        }

      </div>
    </>
  );
}

export default Login;
