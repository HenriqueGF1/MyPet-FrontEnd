import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function HeaderPages({ tituloPagina }) {
  let navigate = useNavigate();

  return (
    <div className="w-[100%] flex justify-between items-center">
      <h1 className="text-lg font-bold p-3 mt-5">{tituloPagina}</h1>
      <button
        className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02] hover:text-black"
        type="submit"
        onClick={() => navigate(-1)}
      >
        Voltar
      </button>
    </div>
  );
}

HeaderPages.propTypes = {
  tituloPagina: PropTypes.string.isRequired,
};

export default HeaderPages;
