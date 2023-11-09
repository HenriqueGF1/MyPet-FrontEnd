import { Link } from "react-router-dom";

function ContatosList({
    id_endereco,
    cep,
    bairro,
    numero,
    complemento,
    principal,
    handlePrincipal,
    handleDelete
}) {

    return (
        <>
            <ul >
                <li><b>id_contato:</b> {id_endereco}</li>
                <li><b>CEP:</b> {cep}</li>
                <li><b>Bairro:</b> {bairro}</li>
                <li><b>Complemento:</b> {complemento}</li>
                <li><b>Numero:</b> {numero}</li>
                <li><b>Principal:</b> {principal}</li>
                <li>
                    <Link to={`/enderecos/editar/${id_endereco}`}>EDITAR: - {id_endereco}</Link>
                </li>
                <br />
                <li onClick={() => handlePrincipal(id_endereco)}>
                    {principal == 0 ? "COLOCAR COMO PRINCIPAL " : ""}
                    - {id_endereco}
                </li>
                <br />
                {principal == 0 ? <li onClick={() => handleDelete(id_endereco)}>EXCLUIR: - {id_endereco}</li> : ""}
                <br />
            </ul>
        </>
    )


}

export default ContatosList;
