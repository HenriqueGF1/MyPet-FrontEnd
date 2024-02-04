import ErrosField from "../../../components/Validation/errosField";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import MessageValidation from "../../../components/Validation/MessageValidation";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function CreatePorte() {
  let navigate = useNavigate();

  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    let response = await apiFetch(`/admin/porteAnimais`, "post", data);

    if (response.code == 201) {
      toast.success("Cadastrado com sucesso");
      navigate("/admin/portes");
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

      <HeaderPages tituloPagina="Cadastrar Porte" />

      <form onSubmit={handleSubmit(create)} id="createPorte">
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
          <div className="bg-[#FFFFFF] rounded shadow-md w-[90%] p-3">
            <div>
              <div className="">
                <div className="p-3 w-[100%]">
                  <label
                    className={
                      errosApi.erro?.descricao || errors.descricao
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Descrição
                  </label>
                  <input
                    className={
                      errosApi.erro?.descricao || errors.descricao
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha sua Descrição"
                    {...register("descricao", { required: true })}
                  />
                  {errosApi.erro?.descricao && (
                    <ErrosField errosApi={errosApi} field="descricao" />
                  )}
                  {errors.descricao &&
                    MessageValidation("descricao", errors.descricao.type)}
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

export default CreatePorte;
