import { Link } from "react-router-dom";

function PorteList({
    id_porte,
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
                    {dt_inativacao ? "" : <Link to={`/admin/portes/editar/${id_porte}`}>EDITAR: - {id_porte}</Link>}
                </li>
                <br />
                <li onClick={() => handleDelete(id_porte)}>DELETAR: - {id_porte}</li>
                <br />
                {dt_inativacao ? "" : <li onClick={() => handleDesativar(id_porte)}>DESATIVAR: - {id_porte}</li>}
                <br />
                {dt_inativacao ? <li onClick={() => handleAtivar(id_porte)}>ATIVAR: - {id_porte}</li> : ""}
                <br />
            </ul>
        </>
    )
}


export default PorteList