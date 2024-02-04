import AnimalDetalhes from "../Animais/AnimalDetalhes";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function DenunciasList({
  id_denuncia,
  descricao,
  tipo,
  animal,
  dt_exclusao,
  handleRetirarDenuncia,
  ativarNovamenteDenuncia,
}) {
  return (
    <div className={`bg-[#FFFFFF] w-[80%] p-5 my-3 mx-auto`}>
      <div
        className={`w-[100%] flex flex-col lg:flex-row ${
          dt_exclusao ? "border-l-8 border-[--color-06] line-through" : ""
        }`}
      >
        <div className="p-3">
          <h1 className="text-base font-bold my-3">Denúncia</h1>
          <p className="text-sm my-1 mr-1">
            <b>Descrição: </b>
            {descricao}
          </p>
          <p className="text-sm my-1 mr-1">
            <b>Tipo:</b> {tipo.descricao}
          </p>

          <div className="w-[100%]">
            <AnimalDetalhes animal={animal}></AnimalDetalhes>
          </div>

          {dt_exclusao ? (
            <button
              onClick={() => ativarNovamenteDenuncia(id_denuncia)}
              className="botao btn-group text-white bg-[--color-04] hover:bg-[--color-02] hover:text-black"
              type="submit"
            >
              Ativar Novamente Denuncia
            </button>
          ) : (
            <>
              <Link
                to={`/denuncias/editar/${id_denuncia}`}
                className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
                type="submit"
              >
                Editar Denúncia
              </Link>

              <button
                onClick={() => handleRetirarDenuncia(id_denuncia)}
                className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black"
                type="submit"
              >
                Retirar Denúncia
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

DenunciasList.propTypes = {
  id_denuncia: PropTypes.number.isRequired,
  descricao: PropTypes.string.isRequired,
  dt_exclusao: PropTypes.string,
  tipo: PropTypes.shape({
    descricao: PropTypes.string.isRequired,
  }).isRequired,
  animal: PropTypes.object.isRequired,
  handleRetirarDenuncia: PropTypes.func.isRequired,
  ativarNovamenteDenuncia: PropTypes.func.isRequired,
};

export default DenunciasList;
