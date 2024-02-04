import ErrosField from "../../components/Validation/errosField";
import MessageValidation from "../../components/Validation/MessageValidation";
import PropTypes from "prop-types";
import TipoDenucia from "../../components/TipoDenucia/TipoDenucia";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";

function CreateDenuncia({ id_usuario, id_animal }) {
  let navigate = useNavigate();

  const [errosApi, setErrosApi] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const create = async (data) => {
    let usuario = JSON.parse(localStorage.getItem("user"));

    let dados = {
      id_animal: id_animal,
      id_usuario_denunciante: usuario.id_usuario,
      id_usuario: id_usuario,
      descricao: data.descricao,
      id_tipo: data.id_tipo,
    };

    let response = await apiFetch(`animais/denuncias`, "post", dados);

    if (response.code == 201) {
      toast.success("Denunciado com sucesso");
      navigate("/minhas/denuncias");
    } else {
      setErrosApi({
        code: response.code,
        erro: response.data.errors,
      });
    }
  };

  return (
    <div className="bg-[#FFFFFF] rounded shadow-md p-5">
      <h1 className="text-center text-xl font-bold">Denunciar Animal</h1>

      <form onSubmit={handleSubmit(create)} id="createAnimal">
        <TipoDenucia
          label="Tipo de Denuncia"
          name="id_tipo"
          register={register}
        />

        <label
          className={
            errosApi.erro || errors.descricao ? "label-erro" : "label-padrao"
          }
        >
          Descrição
        </label>
        <textarea
          cols={10}
          rows={5}
          className={
            errosApi.erro || errors.descricao ? "input-erro" : "input-padrao"
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
      </form>
    </div>
  );
}

CreateDenuncia.propTypes = {
  id_usuario: PropTypes.number.isRequired,
  id_animal: PropTypes.number.isRequired,
};

export default CreateDenuncia;
