import ErrosField from "../../../components/Validation/errosField";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import MessageValidation from "../../../components/Validation/MessageValidation";
import NavBar from "../../../components/NavBar/NavBar";
import limparNumeros from "../../../helpers/limparNumeros";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

function CreateContato() {
  let navigate = useNavigate();

  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    data.dd = limparNumeros(data.dd);

    let response = await apiFetch(`contatos`, "post", data);

    if (response.code == 201) {
      toast.success("Cadastrado com sucesso !!");
      navigate("/usuarios/contatos");
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

      <HeaderPages tituloPagina="Cadastrar Contato" />

      <form onSubmit={handleSubmit(create)}>
        <div className=" w-[100%] h-screen flex flex-col justify-center items-center">
          <div className="w-[90%] my-5 p-3 rounded shadow-2xl">
            <div>
              <div className="">
                <div className="p-3 w-[100%]">
                  <label
                    className={
                      errosApi.erro?.dd || errors.dd
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    DD
                  </label>
                  <InputMask
                    className={
                      errosApi.erro?.dd || errors.dd
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha seu dd"
                    mask="(99)"
                    {...register("dd", { required: true })}
                  />
                  {errosApi.erro?.dd && (
                    <ErrosField errosApi={errosApi} field="dd" />
                  )}
                  {errors.dd && MessageValidation("dd", errors.dd.type)}

                  <label
                    className={
                      errosApi.erro?.numero || errors.numero
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Número de Telefone
                  </label>
                  <InputMask
                    className={
                      errosApi.erro?.numero || errors.numero
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha seu número"
                    mask="9999-9999"
                    {...register("numero", { required: true })}
                  />
                  {errosApi.erro?.numero && (
                    <ErrosField errosApi={errosApi} field="numero" />
                  )}
                  {errors.numero &&
                    MessageValidation("numero", errors.numero.type)}
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

export default CreateContato;
