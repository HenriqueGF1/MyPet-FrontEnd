import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function FavoritosList({
    id_favorito,
    animal,
    handleFavorito
}) {
    return (
        <>
            <p>
                {animal.fotos.map((foto) => {
                    return (
                        <img
                            key={foto.nome_arquivo}
                            src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                            width={'100px'}
                        />
                    )
                })}
            </p>
            <p><b>Nome:</b> {animal.nome}</p>
            <p><b>Descricao:</b> {animal.descricao}</p>
            <p><b>Categoria:</b> {animal.categoria.descricao}</p>
            <p><b>Porte:</b> {animal.porte.descricao}</p>
            <br />
            <ul>
                <li onClick={() => handleFavorito(id_favorito)}>REMOVER FAVORITO: - {id_favorito}</li>
            </ul>
            <br />
            <p>
                <Link to={`/animais/${animal.id_animal}`}>Ver Detalhes...</Link>
            </p>
            <br />
            <hr />
        </>
    )
}

FavoritosList.propTypes = {
    id_favorito: PropTypes.number.isRequired,
    animal: PropTypes.object.isRequired, 
    handleFavorito: PropTypes.func.isRequired,
};

export default FavoritosList