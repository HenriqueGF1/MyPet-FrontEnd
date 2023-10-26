import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../context/apiContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Login() {
  const { authenticated, loading, handleLogin, handleLogout } = useContext(Context);
  let navigate = useNavigate();
  const [erros, setErros] = useState([])

  const {
    register,
    handleSubmit
  } = useForm();

  const login = async (data) => {

    const { response } = await handleLogin(data)

    if (response.status == 200) {
      navigate("/home");
    } else {
      setErros(response.data.errors);
    }
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
            value='123321'
            {...register("password", { required: true })}
          />
          {
            erros?.password?.map((message, index) => {
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
              <button onClick={() => handleSubmit(login)()}>Login</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          </>)
        }

      </div>
    </>
  );
}

export default Login;
