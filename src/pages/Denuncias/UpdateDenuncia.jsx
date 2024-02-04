import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { useParams } from "react-router-dom";
import TipoDenucia from "../../components/TipoDenucia/TipoDenucia";
import { toast } from "react-toastify";
import Loading from "../../components/Loading/Loading";
import MessageValidation from "../../components/Validation/MessageValidation";
import ErrosField from "../../components/Validation/errosField";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";

function UpdateDenuncia() {
  let navigate = useNavigate();

  let { id_denuncia } = useParams();
  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let response = await apiFetch(`animais/denuncias/${id_denuncia}`, "get");
      return {
        id_denuncia: response.data?.id_denuncia,
        descricao: response.data?.descricao,
        id_tipo: response.data?.id_tipo,
      };
    },
  });

  const edit = async (data) => {
    let response = await apiFetch(
      `animais/denuncias/${data.id_denuncia}`,
      "patch",
      data
    );

    if (response.code == 200) {
      toast.success("Editado com Sucesso !!");
      navigate("/minhas/denuncias");
    } else {
      setErrosApi({
        code: response.code,
        erro: response.data.errors,
      });
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Editar Denúncia" />

      <form onSubmit={handleSubmit(edit)} id="editAnimal">
        <div className="w-[100%] h-screen flex flex-col justify-center items-center">
          <div className="bg-[#FFFFFF] rounded shadow-md w-[90%] my-5 p-3">
            <div>
              <div className="">
                <div className="p-3 w-[100%]">
                  <TipoDenucia
                    label="Tipo de Denúncia"
                    name="id_tipo"
                    register={register}
                  />

                  <label
                    className={
                      errosApi.erro || errors.descricao
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Descrição
                  </label>
                  <textarea
                    cols={10}
                    rows={5}
                    className={
                      errosApi.erro || errors.descricao
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
                  <div className="w-[100%] my-5 flex justify-between">
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

export default UpdateDenuncia;
