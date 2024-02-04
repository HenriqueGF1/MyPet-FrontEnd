import PropTypes from "prop-types";
import formatarCEP from "../../helpers/formatarCEP";
import { Link } from "react-router-dom";

function ContatosList({
  id_endereco,
  cep,
  bairro,
  numero,
  complemento,
  principal,
  handlePrincipal,
  handleDelete,
}) {
  return (
    <div
      className={`bg-[#FFFFFF] rounded shadow-md w-[100%] m-3 p-5 ${
        principal ? "border-l-8 border-[--color-principal]" : ""
      }
        w-[90%] p-3 my-3 mx-auto`}
    >
      <div className="w-[100%] lg:w-[50%] flex flex-col lg:flex-row">
        <div className="p-3">
          <p className="text-sm my-1 mr-1">
            <b>Cep: </b>
            {formatarCEP(cep)}
          </p>
          <p className="text-sm my-1 mr-1">
            <b>Bairro: </b>
            {bairro}
          </p>
          <p className="text-sm my-1 mr-1">
            <b>Numero: </b>
            {numero}
          </p>
          <p className="text-sm my-1 mr-1">
            <b>Complemento: </b>
            {complemento}
          </p>
        </div>
      </div>

      <Link
        to={`/enderecos/editar/${id_endereco}`}
        className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
        type="submit"
      >
        Editar
      </Link>

      {principal == 0 ? (
        <>
          <button
            onClick={() => handlePrincipal(id_endereco)}
            className="botao btn-group text-black bg-[--color-07] hover:bg-[--color-02]"
            type="submit"
          >
            Colocar Como Principal
          </button>

          <button
            onClick={() => handleDelete(id_endereco)}
            className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black"
            type="submit"
          >
            Excluir
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

ContatosList.propTypes = {
  id_endereco: PropTypes.number.isRequired,
  cep: PropTypes.string.isRequired,
  bairro: PropTypes.string.isRequired,
  numero: PropTypes.number.isRequired,
  complemento: PropTypes.string,
  principal: PropTypes.number.isRequired,
  handlePrincipal: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ContatosList;
