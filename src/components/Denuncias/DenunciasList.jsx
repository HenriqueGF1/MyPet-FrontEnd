import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import AnimalDetalhes from "../Animais/AnimalDetalhes";

function DenunciasList({
    id_denuncia,
    descricao,
    tipo,
    usuario,
    animal,
    dt_exclusao,
    handleRetirarDenuncia
}) {

    return (
        <>
            <ul >
                <li>{dt_exclusao ? '------EXCLUÍDO------' : ''}</li>
                <h1>Denúncia</h1>
                <li><b>Descrição:</b> {descricao}</li>
                <li><b>Tipo:</b> {tipo.descricao}</li>
                <br />
                {/* <li><b>Animal Denunciado:</b> {animal.nome}</li> */}

                <h1>Animal</h1>

                <br />
                <AnimalDetalhes
                    animal={animal}
                >
                </AnimalDetalhes>
                <br />
                {dt_exclusao ? "" : <li onClick={() => handleRetirarDenuncia(id_denuncia)}>RETIRAR DENUNCIA: - {id_denuncia}</li>}
                <br />
                {dt_exclusao ? "" : <li><Link to={`/denuncias/editar/${id_denuncia}`}>EDITAR DENUNCIA: - {id_denuncia}</Link></li>}
                <br />
                <li>
                </li>

            </ul>
            <hr />
            <br />
        </>
    )
}

DenunciasList.propTypes = {
    id_denuncia: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    tipo: PropTypes.shape({
        descricao: PropTypes.string.isRequired,
    }).isRequired,
    usuario: PropTypes.object.isRequired,
    animal: PropTypes.object.isRequired,
    // dt_exclusao: PropTypes.string.isRequired,
    handleRetirarDenuncia: PropTypes.func.isRequired,
};

export default DenunciasList;
