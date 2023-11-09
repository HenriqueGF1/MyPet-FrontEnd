import { Link } from "react-router-dom";

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
                <li><b>id_contato:</b> {id_contato}</li>
                <li><b>DD:</b> {dd}</li>
                <li><b>Numero:</b> {numero}</li>
                <li><b>Principal:</b> {principal}</li>
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

export default ContatosList;
