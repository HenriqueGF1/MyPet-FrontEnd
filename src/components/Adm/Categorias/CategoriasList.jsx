import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

function CategoriasList({
    id_categoria,
    descricao,
    dt_registro,
    dt_inativacao,
    dt_exclusao,
    handleDesativar,
    handleAtivar,
    handleDelete
}) {
    return (
        <>
            <ul >
                <li>{dt_inativacao ? 'DESATIVADO' : ''}</li>
                <li><b>Descrição:</b> {descricao}</li>
                <li><b>Data Registro:</b> {dt_registro}</li>
                <li><b>Data Inativação:</b> {dt_inativacao}</li>
                <li><b>Data Exclusão:</b> {dt_exclusao}</li>
                <br />
                <li>
                    {dt_inativacao ? "" : <Link to={`/admin/categorias/editar/${id_categoria}`}>EDITAR: - {id_categoria}</Link>}
                </li>
                <br />
                <li onClick={() => handleDelete(id_categoria)}>DELETAR: - {id_categoria}</li>
                <br />
                {dt_inativacao ? "" : <li onClick={() => handleDesativar(id_categoria)}>DESATIVAR: - {id_categoria}</li>}
                <br />
                {dt_inativacao ? <li onClick={() => handleAtivar(id_categoria)}>ATIVAR: - {id_categoria}</li> : ""}
                <br />
            </ul>
        </>
    )
}

CategoriasList.propTypes = {
    id_categoria: PropTypes.number.isRequired,
    descricao: PropTypes.string.isRequired,
    dt_registro: PropTypes.string.isRequired,
    dt_inativacao: PropTypes.string,
    dt_exclusao: PropTypes.string,
    handleDesativar: PropTypes.func.isRequired,
    handleAtivar: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default CategoriasList