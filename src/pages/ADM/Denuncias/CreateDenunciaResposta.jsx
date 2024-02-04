import ErrosField from "../../../components/Validation/errosField";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import MessageValidation from "../../../components/Validation/MessageValidation";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function CreateDenunciaResposta() {
  let navigate = useNavigate();

  let { id_denuncia } = useParams();
  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    let dados = {
      id_denuncia: id_denuncia,
      aceite: data.aceite,
      resposta: data.resposta,
    };

    let response = await apiFetch(`admin/denuncias/respostas`, "post", dados);

    if (response.code == 201) {
      toast.success(`Respondida com sucesso !!!`);
      navigate("/admin/denuncias");
      return;
    }

    setErrosApi({
      code: response.code,
      erro: response.data.errors,
    });
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Administrador Responder Denuncia" />

      <form onSubmit={handleSubmit(create)} id="createDenunciaResposta">
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
          <div className="bg-[#FFFFFF] rounded shadow-md w-[90%] p-3">
            <div>
              <div className="">
                <div className="p-3 w-[100%]">
                  <label
                    className={
                      errosApi.erro?.aceite || errors.aceite
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Aceite
                  </label>

                  <label
                    className={
                      errosApi.erro?.aceite || errors.aceite
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Sim
                  </label>
                  <input
                    type="radio"
                    value="1"
                    {...register("aceite", { required: true })}
                  />
                  {errosApi.erro?.aceite && (
                    <ErrosField errosApi={errosApi} field="aceite" />
                  )}
                  {errors.aceite &&
                    MessageValidation("aceite", errors.aceite.type)}

                  <label
                    className={
                      errosApi.erro?.aceite || errors.aceite
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Não
                  </label>
                  <input
                    type="radio"
                    value="0"
                    {...register("aceite", { required: true })}
                  />
                  {errosApi.erro?.aceite && (
                    <ErrosField errosApi={errosApi} field="aceite" />
                  )}
                  {errors.aceite &&
                    MessageValidation("aceite", errors.aceite.type)}

                  <label
                    className={
                      errosApi.erro?.resposta || errors.resposta
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Resposta
                  </label>
                  <textarea
                    className={
                      errosApi.erro?.resposta || errors.resposta
                        ? "input-erro"
                        : "input-padrao"
                    }
                    rows="5"
                    cols="50"
                    type="text"
                    placeholder="Preencha sua Resposta"
                    {...register("resposta", { required: true })}
                  />
                  {errosApi.erro?.resposta && (
                    <ErrosField errosApi={errosApi} field="resposta" />
                  )}
                  {errors.resposta &&
                    MessageValidation("resposta", errors.resposta.type)}
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

      <Footer />
    </>
  );
}

export default CreateDenunciaResposta;
