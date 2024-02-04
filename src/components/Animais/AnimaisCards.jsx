import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function AnimaisCards({ animal }) {
  const animalFoto = animal.fotos.map((foto) => foto);

  return (
    <>
      <div className="bg-[#FFFFFF] rounded shadow-md p-3 m-3 w-[90%] md:w-[200px]">
        <div className="">
          <img
            className="object-cover w-[100%] h-[130px]"
            key={animalFoto[0].id_foto_animal}
            src={`http://localhost:8000/${animalFoto[0].url}`}
            alt={animalFoto[0].nome_arquivo_original}
          />
          <p className="text-base font-bold my-1 mr-1">{animal.nome}</p>
          <span className="text-sm my-1 mr-1 opacity-75">
            {animal.categoria.descricao}
          </span>
          <span className="text-sm my-1 mr-1 opacity-75">
            {animal.porte.descricao}
          </span>
          <span className="text-sm my-1 mr-1 opacity-75">
            {animal.sexo == "M" ? "Macho" : "Fêmea"}
          </span>
          <p className="text-sm my-1 mr-1 opacity-75">
            {animal.idade > 1 ? animal.idade + " Anos" : "Recém Nascido"}
          </p>
          <p className="mt-3">
            <Link
              to={`/animais/${animal.id_animal}`}
              className="w-[100%] botao text-white bg-[--color-principal] hover:bg-[--color-02]"
              type="submit"
            >
              Ver Detalhes
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

AnimaisCards.propTypes = {
  animal: PropTypes.shape({
    id_animal: PropTypes.number.isRequired,
    fotos: PropTypes.arrayOf(
      PropTypes.shape({
        nome_arquivo: PropTypes.string,
        url: PropTypes.string,
        nome_arquivo_original: PropTypes.string,
      })
    ).isRequired,
    idade: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired,
    sexo: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    categoria: PropTypes.shape({
      descricao: PropTypes.string.isRequired,
    }).isRequired,
    porte: PropTypes.shape({
      descricao: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default AnimaisCards;
