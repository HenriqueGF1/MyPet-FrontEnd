import { Link } from "react-router-dom";

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


export default CategoriasList