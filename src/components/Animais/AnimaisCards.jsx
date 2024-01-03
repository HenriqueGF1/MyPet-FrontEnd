import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function AnimaisCards({ animal }) {
    
console.log("🚀 ~ file: AnimaisCards.jsx:5 ~ AnimaisCards ~ animal:", animal)

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
            <p>
                <Link to={`/animais/${animal.id_animal}`}>Ver Detalhes...</Link>
            </p>
            <br />
            <hr />
        </>
    )

}

AnimaisCards.propTypes = {
    animal: PropTypes.shape({
        id_animal: PropTypes.number.isRequired,
        fotos: PropTypes.arrayOf(
            PropTypes.shape({
                nome_arquivo: PropTypes.string,
                url: PropTypes.string,
                nome_arquivo_original: PropTypes.string
            })
        ).isRequired,
        nome: PropTypes.string.isRequired,
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
