import ErrosField from "../components/Validation/errosField";
import Footer from "../components/Footer/Footer";
import InputMask from "react-input-mask/lib/react-input-mask.development";
import MessageValidation from "../components/Validation/MessageValidation";
import NavBar from "../components/NavBar/NavBar";
import limparNumeros from "../helpers/limparNumeros";
import retornoCep from "../helpers/retornoCep";
import { Context } from "../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

function CriarConta() {
  let navigate = useNavigate();
  const [errosApi, setErrosApi] = useState({});
  const { handleCreate } = useContext(Context);
  const { loadingApi } = useContext(Context);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    data.dd = limparNumeros(data.dd);
    data.cep = limparNumeros(data.cep);

    const { response } = await handleCreate(data);

    if (response.data.code == 200) {
      toast.success("Bem vindo a plataforma");
      navigate("/");
    } else {
      setErrosApi({
        code: response.code,
        erro: response.data.errors,
      });
    }
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

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <>
      <NavBar />

      <form onSubmit={handleSubmit(create)} id="createUsuario">
        <div className="w-[100%] flex flex-col justify-center items-center">
          <div className="bg-[#FFFFFF] rounded shadow-md w-[90%] my-5 p-3">
            <h1 className="text-center text-3xl font-bold p-3 my-5">
              Criar Conta
            </h1>

            <div>
              <div className="flex items-start">
                <div className="p-3 w-[100%]">
                  <div>
                    <h1 className="text-lg font-bold my-3">
                      Infirmações Pessoais
                    </h1>
                  </div>

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
                    placeholder="Preencha seu nome..."
                    {...register("nome", { required: true })}
                  />
                  {errosApi.erro?.nome && (
                    <ErrosField errosApi={errosApi} field="nome" />
                  )}
                  {errors.nome && MessageValidation("nome", errors.nome.type)}

                  <label
                    className={
                      errosApi.erro?.email || errors.email
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    E-mail
                  </label>
                  <input
                    className={
                      errosApi.erro?.email || errors.email
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha seu e-mail"
                    {...register("email", { required: true })}
                  />
                  {errosApi.erro?.email && (
                    <ErrosField errosApi={errosApi} field="email" />
                  )}
                  {errors.email &&
                    MessageValidation("email", errors.email.type)}

                  <label
                    className={
                      errosApi.erro?.password || errors.password
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Senha
                  </label>
                  <input
                    className={
                      errosApi.erro?.password || errors.password
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha sua senha"
                    {...register("password", { required: true })}
                  />
                  {errosApi.erro?.password && (
                    <ErrosField errosApi={errosApi} field="password" />
                  )}
                  {errors.password &&
                    MessageValidation("password", errors.password.type)}

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
                    placeholder="Preencha sua idade"
                    {...register("idade", { required: true })}
                  />
                  {errosApi.erro?.idade && (
                    <ErrosField errosApi={errosApi} field="idade" />
                  )}
                  {errors.idade &&
                    MessageValidation("idade", errors.idade.type)}
                </div>
              </div>

              <div className="flex items-start">
                <div className="p-3 w-[100%]">
                  <div>
                    <h1 className="text-lg font-bold my-3">
                      Informações de Contato
                    </h1>
                  </div>

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

              <div className="flex items-start">
                <div className="p-3 w-[100%]">
                  <div>
                    <h1 className="text-lg font-bold my-3">
                      Infirmações de Endereço
                    </h1>
                  </div>

                  <label
                    className={
                      errosApi.erro?.cep || errors.cep
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Cep
                  </label>
                  <InputMask
                    className={
                      errosApi.erro?.cep || errors.cep
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="text"
                    placeholder="Preencha seu cep"
                    id="cep"
                    mask="99999-999"
                    {...register("cep", { required: true })}
                    onChange={() => {
                      handleCep("cep", "bairro", "complemento");
                    }}
                  />
                  {errosApi.erro?.cep && (
                    <ErrosField errosApi={errosApi} field="cep" />
                  )}
                  {errors.cep && MessageValidation("cep", errors.cep.type)}

                  <label
                    className={
                      errosApi.erro?.bairro || errors.bairro
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Bairro
                  </label>
                  <input
                    className={
                      errosApi.erro?.bairro || errors.bairro
                        ? "input-erro"
                        : "input-padrao"
                    }
                    id="bairro"
                    type="text"
                    placeholder="Preencha seu cep"
                    {...register("bairro", { required: true })}
                  />
                  {errosApi.erro?.bairro && (
                    <ErrosField errosApi={errosApi} field="bairro" />
                  )}
                  {errors.bairro &&
                    MessageValidation("bairro", errors.bairro.type)}

                  <label
                    className={
                      errosApi.erro?.numero_endereco || errors.numero_endereco
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Número de Endereço
                  </label>
                  <input
                    className={
                      errosApi.erro?.numero_endereco || errors.numero_endereco
                        ? "input-erro"
                        : "input-padrao"
                    }
                    type="number"
                    placeholder="Preencha seu número de endereço"
                    {...register("numero_endereco", { required: true })}
                  />
                  {errosApi.erro?.numero_endereco && (
                    <ErrosField errosApi={errosApi} field="numero_endereco" />
                  )}
                  {errors.numero_endereco &&
                    MessageValidation(
                      "número de endereço",
                      errors.numero_endereco.type
                    )}

                  <label
                    className={
                      errosApi.erro?.complemento || errors.complemento
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Complemento de Endereço
                  </label>
                  <textarea
                    className={
                      errosApi.erro?.complemento || errors.complemento
                        ? "input-erro"
                        : "input-padrao"
                    }
                    id="complemento"
                    type="number"
                    placeholder="Preencha seu complemento de endereço"
                    {...register("complemento", { required: true })}
                    rows="10"
                    cols="50"
                  />
                  {errosApi.erro?.complemento && (
                    <ErrosField errosApi={errosApi} field="complemento" />
                  )}
                  {errors.complemento &&
                    MessageValidation("complemento", errors.complemento.type)}
                </div>
              </div>

              {loadingApi ? (
                <div className="w-[100%] font-semibold my-5 flex justify-center items-center">
                  <h1>Carregando...</h1>
                </div>
              ) : (
                <>
                  <div className="w-[100%] my-3 p-3 flex justify-between">
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

export default CriarConta;
