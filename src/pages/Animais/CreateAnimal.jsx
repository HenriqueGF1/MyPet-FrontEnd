import Categorias from "../../components/Categorias/Categorias";
import ErrosField from "../../components/Validation/errosField";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import MessageValidation from "../../components/Validation/MessageValidation";
import NavBar from "../../components/NavBar/NavBar";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { previewFiles } from "../../services/previewImagem";

function CreateAnimal() {
  let navigate = useNavigate();

  const [errosApi, setErrosApi] = useState({});
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log("🚀 ~ CreateAnimal ~ errors:", errors);

  const create = async (data) => {
    let animalData = new FormData(document.getElementById("createAnimal"));

    let response = await apiFetch(`animais`, "post", animalData);

    if (response.code == 201) {
      toast.success("Cadastrado com sucesso");
      navigate("/usuario/animais");
      return;
    }

    setErrosApi({
      code: response.code,
      erro: response.data.errors,
    });
  };

  const currentDate = new Date().toISOString().split("T")[0]; 

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Cadastrar Animal" />

      <form onSubmit={handleSubmit(create)} id="createAnimal">
        <div className="w-[100%] my-5 flex flex-col justify-center items-center">
          <div className="bg-[#FFFFFF] w-[90%] my-5 p-3 rounded shadow-md">
            <div>
              <div className="flex items-start">
                <div className="p-3 w-[100%]">
                  <label
                    className={
                      errosApi.erro?.nome || errors.nome
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Nome
                  </label>
                  <input
                    className={
                      errosApi.erro?.nome || errors.nome
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha seu Nome"
                    {...register("nome", { required: true })}
                  />
                  {errosApi.erro?.nome && (
                    <ErrosField errosApi={errosApi} field="nome" />
                  )}
                  {errors.nome && MessageValidation("nome", errors.nome.type)}
                </div>

                <div className="p-3">
                  <label
                    className={
                      errosApi.erro?.idade || errors.idade
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Idade
                  </label>
                  <input
                    className={
                      errosApi.erro?.idade || errors.idade
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="date"
                    max={currentDate}
                    {...register("idade", { required: true })}
                  />
                  {errosApi.erro?.idade && (
                    <ErrosField errosApi={errosApi} field="idade" />
                  )}
                  {errors.idade &&
                    MessageValidation("idade", errors.idade.type)}
                </div>
              </div>

              <div className="p-3 w-[100%]">
                <label
                  className={
                    errosApi.erro?.sexo || errors.sexo
                      ? "label-erro"
                      : "label-padrao"
                  }
                >
                  Sexo
                </label>

                <div className="flex justify-around">
                  <div className="w-[50%]">
                    <label
                      className={
                        errosApi.erro?.sexo || errors.sexo
                          ? "label-erro"
                          : "label-padrao"
                      }
                    >
                      M
                    </label>
                    <input
                      type="radio"
                      value="M"
                      {...register("sexo", { required: true })}
                    />
                    <br />
                    {errosApi.erro?.sexo && (
                      <ErrosField errosApi={errosApi} field="sexo" />
                    )}
                    {errors.sexo && MessageValidation("sexo", errors.sexo.type)}
                  </div>

                  <div className="w-[50%]">
                    <label
                      className={
                        errosApi.erro?.sexo || errors.sexo
                          ? "label-erro"
                          : "label-padrao"
                      }
                    >
                      F
                    </label>
                    <input
                      type="radio"
                      value="F"
                      {...register("sexo", { required: true })}
                    />
                    <br />
                    {errosApi.erro?.sexo && (
                      <ErrosField errosApi={errosApi} field="sexo" />
                    )}
                    {errors.sexo && MessageValidation("sexo", errors.sexo.type)}
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3">
                  <PorteAnimal
                    label="Porte Animal"
                    name="id_porte"
                    register={register}
                  />
                </div>

                <div className="p-3">
                  <Categorias
                    label="Categorias"
                    name="id_categoria"
                    register={register}
                  />
                </div>
              </div>

              <div className="p-3">
                <label
                  className={
                    errosApi.erro?.descricao || errors.descricao
                      ? "label-erro"
                      : "label-padrao"
                  }
                >
                  Descrição
                </label>
                <textarea
                  className={
                    errosApi.erro?.descricao || errors.descricao
                      ? "input-erro"
                      : "input-padrao"
                  }
                  type="text"
                  cols="60"
                  rows="7"
                  placeholder="Preencha sua Descrição"
                  {...register("descricao", { required: true })}
                />
                {errosApi.erro?.descricao && (
                  <ErrosField errosApi={errosApi} field="descricao" />
                )}
                {errors.descricao &&
                  MessageValidation("descricao", errors.descricao.type)}
              </div>

              <div className="p-3">
                <label
                  className={
                    errosApi.erro?.imagens || errors.imagens
                      ? "label-erro"
                      : "label-padrao"
                  }
                >
                  Imagens
                </label>
                <input
                  className={
                    errosApi.erro?.imagens || errors.imagens
                      ? "input-erro"
                      : "input-padrao"
                  }
                  id="imagens"
                  type="file"
                  {...register("imagens[]", { required: true })}
                  onChange={() => previewFiles("imagens", "previews")}
                />
                {errosApi.erro?.imagens && (
                  <ErrosField errosApi={errosApi} field="imagens" />
                )}
                {errors.imagens &&
                  MessageValidation("imagens", errors.imagens.type)}

                <div id="previews" className="w-[100%]"></div>
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

export default CreateAnimal;
