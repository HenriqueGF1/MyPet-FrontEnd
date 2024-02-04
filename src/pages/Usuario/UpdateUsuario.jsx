import ErrosField from "../../components/Validation/errosField";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import Loading from "../../components/Loading/Loading";
import MessageValidation from "../../components/Validation/MessageValidation";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useContext } from "react";

function UpdateUsuario() {
  let navigate = useNavigate();

  let { id_usuario } = useParams();
  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let response = await apiFetch(`usuarios/${id_usuario}`, "get");
      return {
        id_usuario: response.data.id_usuario,
        nome: response.data.nome,
      };
    },
  });

  const edit = async (data) => {
    let response = await apiFetch(`usuarios/${data.id_usuario}`, "patch", data);

    if (response.code == 200) {
      toast.success("Editado com sucesso");

      localStorage.removeItem("user");

      localStorage.setItem(
        "user",
        JSON.stringify({
          id_usuario: response.data.id_usuario,
          nome: response.data.nome,
          id_perfil: response.data.perfil_usuario[0].id_perfil,
          authenticated: true,
        })
      );

      navigate("/");
    }

    setErrosApi({
      code: response.code,
      erro: response.data.errors,
    });
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Editar Usuário" />

      {loadingApi ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(edit)}>
            <div className="w-[100%] h-screen flex flex-col justify-center items-center">
              <div className="bg-[#FFFFFF] rounded shadow-md w-[95%] lg:w-1/2 p-3">
                <div className="w-[100%]">
                  <div className="flex items-start w-[100%]">
                    <div className=" w-[100%] p-3">
                      <label
                        className={
                          errosApi.erro || errors.nome
                            ? "label-erro"
                            : "label-padrao"
                        }
                      >
                        Nome
                      </label>
                      <input
                        className={
                          errosApi.erro || errors.nome
                            ? "input-erro"
                            : "input-padrao"
                        }
                        type="text"
                        placeholder="Preencha seu nome..."
                        {...register("nome", { required: true })}
                      />
                      {errosApi.erro?.nome && (
                        <ErrosField errosApi={errosApi} field="nome" />
                      )}
                      {errors.nome &&
                        MessageValidation("nome", errors.nome.type)}
                    </div>
                  </div>

                  {loadingApi ? (
                    <div className="w-[100%] font-semibold my-5 flex justify-center items-center">
                      <h1>Carregando...</h1>
                    </div>
                  ) : (
                    <>
                      <div className="w-[100%] my-3 p-3 flex justify-between ">
                        <button
                          className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black w-[100%]"
                          type="submit"
                        >
                          Salvar
                        </button>

                        <button
                          className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black w-[100%]"
                          type="reset"
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </>
      )}

      <Footer />
    </>
  );
}

export default UpdateUsuario;
