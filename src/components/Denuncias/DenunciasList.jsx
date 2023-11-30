import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
                <li><b>Descrição:</b> {descricao}</li>
                <li><b>Tipo:</b> {tipo.descricao}</li>
                <li><b>Denunciado:</b> {usuario.nome}</li>
                <li><b>Animal Denunciado:</b> {animal.nome}</li>
                <br />
                {dt_exclusao ? "" : <li onClick={() => handleRetirarDenuncia(id_denuncia)}>RETIRAR DENUNCIA: - {id_denuncia}</li>}
                <br />
                {dt_exclusao ? "" : <li><Link to={`/denuncias/editar/${id_denuncia}`}>EDITAR DENUNCIA: - {id_denuncia}</Link></li>}
                <br />
                <li>
                </li>

            </ul>
        </>
    )
}

DenunciasList.propTypes = {
    id_denuncia: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    tipo: PropTypes.string.isRequired,
    usuario: PropTypes.object.isRequired, 
    animal: PropTypes.object.isRequired,
    dt_exclusao: PropTypes.string.isRequired, 
    handleRetirarDenuncia: PropTypes.func.isRequired,
};

export default DenunciasList;
