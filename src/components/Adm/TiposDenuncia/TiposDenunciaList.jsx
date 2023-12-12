import { Link } from "react-router-dom";

function TiposDenunciaList({
    id_tipo,
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
                {dt_exclusao ? "" : (<>
                    <li>
                        {dt_inativacao ? "" : <Link to={`/admin/denunciasTipos/editar/${id_tipo}`}>EDITAR: - {id_tipo}</Link>}
                    </li>
                    <li>
                        {dt_inativacao ? "" : <ul><li onClick={() => handleDelete(id_tipo)}>DELETAR: - {id_tipo}</li></ul>}
                    </li>
                    <br />
                    <br />
                    {dt_inativacao ? "" : <li onClick={() => handleDesativar(id_tipo)}>DESATIVAR: - {id_tipo}</li>}
                    <br />
                    {dt_inativacao ? <li onClick={() => handleAtivar(id_tipo)}>ATIVAR: - {id_tipo}</li> : ""}
                </>)}
                <br />
            </ul>
        </>
    )
}


export default TiposDenunciaList