import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import formatarNumeroTelefone from '../../helpers/formatarNumeroTelefone'

function ContatosList({
    id_contato,
    dd,
    numero,
    principal,
    handlePrincipal,
    handleDelete
}) {

    return (
        <>
            <ul >
                {/* <li><b>id_contato:</b> {id_contato}</li> */}
                {/* <li><b>DD:</b> {dd}</li> */}
                <li><b>Numero:</b> {formatarNumeroTelefone(dd + numero)}</li>
                {/* <li><b>Principal:</b> {principal}</li> */}
                <li>
                    <Link to={`/contatos/editar/${id_contato}`}>EDITAR: - {id_contato}</Link>
                </li>
                <br />
                <li onClick={() => handlePrincipal(id_contato)}>
                    {principal == 0 ? "COLOCAR COMO PRINCIPAL " : ""}
                    - {id_contato}
                </li>
                <br />
                {principal == 0 ? <li onClick={() => handleDelete(id_contato)}>EXCLUIR: - {id_contato}</li> : ""}
                <br />
            </ul>
        </>
    )

}

ContatosList.propTypes = {
    id_contato: PropTypes.number.isRequired,
    dd: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    principal: PropTypes.number.isRequired,
    handlePrincipal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default ContatosList;
