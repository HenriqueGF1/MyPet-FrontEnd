import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function PorteList({
  id_porte,
  descricao,
  dt_registro,
  dt_inativacao,
  dt_exclusao,
  handleDesativar,
  handleAtivar,
  handleDelete,
}) {

  return (
    <>
      <div
        className={`bg-[#FFFFFF] rounded shadow-md w-[100%] m-3 p-5 ${
          dt_inativacao || dt_exclusao
            ? "border-l-8 border-[--color-06] line-through"
            : ""
        }
                w-[90%] p-3 my-3 mx-auto`}
      >
        <div className="w-[100%] lg:w-[50%] flex flex-col lg:flex-row">
          <div className="p-3">
            <p className="text-sm my-1 mr-1">
              <b>Descrição:</b> {descricao}
            </p>
            <p className="text-sm my-1 mr-1">
              <b>Data Registro:</b> {dt_registro}
            </p>
            {dt_exclusao ? (
              <p className="text-sm my-1 mr-1">
                <b>Data Exclusão:</b> {dt_exclusao}
              </p>
            ) : (
              ""
            )}
            {dt_inativacao ? (
              <p className="text-sm my-1 mr-1">
                <b>Data Inativação:</b> {dt_inativacao}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>

        {!dt_exclusao ? (
          <>
            {dt_inativacao ? (
              <button
                onClick={() => handleAtivar(id_porte)}
                className="botao btn-group text-white bg-[--color-04] hover:bg-[--color-02]"
                type="submit"
              >
                Ativar
              </button>
            ) : (
              ""
            )}

            {!dt_inativacao ? (
              <>
                <Link
                  className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02] hover:text-black"
                  to={`/admin/portes/editar/${id_porte}`}
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleDesativar(id_porte)}
                  className="botao btn-group text-black bg-[--color-07] hover:bg-[--color-02]"
                  type="submit"
                >
                  Desativar
                </button>

                <button
                  onClick={() => handleDelete(id_porte)}
                  className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black"
                  type="submit"
                >
                  Excluir
                </button>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

PorteList.propTypes = {
  id_porte: PropTypes.number.isRequired,
  descricao: PropTypes.string.isRequired,
  dt_registro: PropTypes.string.isRequired,
  dt_inativacao: PropTypes.string,
  dt_exclusao: PropTypes.string,
  handleDesativar: PropTypes.func.isRequired,
  handleAtivar: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default PorteList;
