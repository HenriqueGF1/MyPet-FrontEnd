import ErrosField from "../../../components/Validation/errosField";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import Loading from "../../../components/Loading/Loading";
import MessageValidation from "../../../components/Validation/MessageValidation";
import NavBar from "../../../components/NavBar/NavBar";
import limparNumeros from "../../../helpers/limparNumeros";
import retornoCep from "../../../helpers/retornoCep";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function UpdateEnderecos() {
  let navigate = useNavigate();

  let { id_endereco } = useParams();

  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      let response = await apiFetch(`enderecos/${id_endereco}`, "get");
      return {
        id_endereco: response.data?.id_endereco,
        cep: response.data?.cep,
        numero_endereco: response.data?.numero,
        complemento: response.data?.complemento,
        bairro: response.data?.bairro,
      };
    },
  });

  const edit = async (data) => {
    data.cep = limparNumeros(data.cep);

    let response = await apiFetch(
      `enderecos/${data.id_endereco}`,
      "patch",
      data
    );

    if (response.code == 200) {
      toast.success("Editado com sucesso !!");
      navigate("/usuarios/enderecos");
      return;
    }

    setErrosApi({
      code: response.code,
      erro: response.data.errors,
    });
  };

  const handleCep = async (cep, bairro, complemento) => {
    let cepResultado = await retornoCep(cep, bairro, complemento);

    if (cepResultado === undefined) return;

    setValue("bairro", cepResultado.neighborhood, {
      shouldValidate: true,
    });

    const complementoValue = `${cepResultado.street} ${cepResultado.neighborhood} ${cepResultado.city}-${cepResultado.state}`;

    setValue("complemento", complementoValue, {
      shouldValidate: true,
    });
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Editar Endereço" />

      {loadingApi ? (
        <Loading />
      ) : (
        <>
          <form onSubmit={handleSubmit(edit)}>
            <div className="w-[100%] h-screen flex flex-col justify-center items-center">
              <div className="bg-[#FFFFFF] rounded shadow-md w-[90%] p-3">
                <div>
                  <div className="flex items-start">
                    <div className="p-3">
                      <label
                        className={
                          errosApi.erro || errors.cep
                            ? "label-erro"
                            : "label-padrao"
                        }
                      >
                        Cep
                      </label>
                      <InputMask
                        className={
                          errosApi.erro || errors.cep
                            ? "input-erro"
                            : "input-padrao"
                        }
                        type="text"
                        placeholder="Seu cep"
                        id="cep"
                        mask="99999-999"
                        {...register("cep", { required: true, minLength: 8 })}
                        onChange={() => {
                          handleCep("cep", "bairro", "complemento");
                        }}
                      />
                      {errosApi.erro?.cep && (
                        <ErrosField errosApi={errosApi} field="cep" />
                      )}
                      {errors.cep && MessageValidation("cep", errors.cep.type)}
                    </div>

                    <div className="p-3">
                      <label
                        className={
                          errosApi.erro || errors.numero_endereco
                            ? "label-erro"
                            : "label-padrao"
                        }
                      >
                        Número
                      </label>
                      <input
                        className={
                          errosApi.erro || errors.numero_endereco
                            ? "input-erro"
                            : "input-padrao"
                        }
                        type="text"
                        placeholder="Seu número"
                        {...register("numero_endereco", { required: true })}
                      />
                      {errosApi.erro?.numero_endereco && (
                        <ErrosField
                          errosApi={errosApi}
                          field="numero_endereco"
                        />
                      )}
                      {errors.numero_endereco &&
                        MessageValidation(
                          "número",
                          errors.numero_endereco.type
                        )}
                    </div>
                  </div>

                  <div className="p-3">
                    <label
                      className={
                        errosApi.erro || errors.bairro
                          ? "label-erro"
                          : "label-padrao"
                      }
                    >
                      Bairro
                    </label>
                    <input
                      className={
                        errosApi.erro || errors.bairro
                          ? "input-erro"
                          : "input-padrao"
                      }
                      id="bairro"
                      type="text"
                      placeholder="Seu bairro"
                      {...register("bairro", { required: true })}
                    />
                    {errosApi.erro?.bairro && (
                      <ErrosField errosApi={errosApi} field="bairro" />
                    )}
                    {errors.bairro &&
                      MessageValidation("bairro", errors.bairro.type)}
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 w-[100%]">
                      <label
                        className={
                          errosApi.erro || errors.complemento
                            ? "label-erro"
                            : "label-padrao"
                        }
                      >
                        Complemento de Endereço
                      </label>
                      <textarea
                        className={
                          errosApi.erro || errors.complemento
                            ? "input-erro"
                            : "input-padrao"
                        }
                        id="complemento"
                        type="number"
                        placeholder="Seu complemento de endereço"
                        {...register("complemento", { required: true })}
                        cols="100"
                        rows="5"
                      />
                      {errosApi.erro?.complemento && (
                        <ErrosField errosApi={errosApi} field="complemento" />
                      )}
                      {errors.complemento &&
                        MessageValidation(
                          "complemento",
                          errors.complemento.type
                        )}
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

export default UpdateEnderecos;
