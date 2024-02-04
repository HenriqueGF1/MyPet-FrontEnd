import AnimalDetalhes from "../Animais/AnimalDetalhes";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function FavoritosList({ id_favorito, animal, handleFavorito }) {
  return (
    <>
      <div className="w-[100%]">
        <AnimalDetalhes animal={animal}></AnimalDetalhes>
      </div>

      <div className="w-[100%] my-3 p-3 flex justify-between">
        <Link
          className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black w-[100%]"
          to={`/animais/${animal.id_animal}`}
        >
          Ver Detalhes...
        </Link>
        <button
          onClick={() => handleFavorito(id_favorito)}
          className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black w-[100%]"
          type="reset"
        >
          Remover dos Favoritos
        </button>
      </div>
    </>
  );
}

FavoritosList.propTypes = {
  id_favorito: PropTypes.number.isRequired,
  animal: PropTypes.object.isRequired,
  handleFavorito: PropTypes.func.isRequired,
};

export default FavoritosList;
