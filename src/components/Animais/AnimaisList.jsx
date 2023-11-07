import { Link } from "react-router-dom";

function AnimaisList({
    id_animal,
    dt_inativacao,
    nome,
    usuario,
    adotado,
    sexo,
    descricao,
    categoria,
    idade,
    porte,
    fotos,
    handleDelete,
    handleAdotado,
    handleDesativar,
    handleAtivar
}) {

    return (
        <>
            <ul >
                <li>{dt_inativacao ? 'DESATIVADO' : ''}</li>
                <li><b>Nome:</b> {nome}</li>
                <li><b>Dono:</b> {usuario}</li>
                <li><b>Adotado:</b> {adotado}</li>
                <li><b>Sexo:</b> {sexo}</li>
                <li><b>Descricao:</b> {descricao}</li>
                <li><b>Categoria:</b> {categoria}</li>
                <li><b>Idade:</b> {idade}</li>
                <li><b>Porte:</b> {porte}</li>
                <li>
                    <b>Fotos:</b>
                    {
                        fotos.length == 0 ? <h1>Carregando........</h1> : fotos.map((foto) => {
                            return (
                                <img
                                    key={foto.nome_arquivo}
                                    src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                                    width={'100px'}
                                />
                            )
                        })
                    }
                </li>
                <br />
                <li>
                    {dt_inativacao ? "" : <Link to={`/animais/editar/${id_animal}`}>EDITAR: - {id_animal}</Link>}
                </li>
                <br />
                <li onClick={() => handleDelete(id_animal)}>DELETAR: - {id_animal}</li>
                <br />
                {dt_inativacao ? "" : <li onClick={() => handleAdotado(id_animal, adotado)}>
                    {adotado == 0 ? "ADOTAR " : "REMOVER ADOÇÃO "}
                    - {id_animal}
                </li>}
                <br />
                {dt_inativacao ? "" : <li onClick={() => handleDesativar(id_animal)}>DESATIVAR: - {id_animal}</li>}
                <br />
                {dt_inativacao ? <li onClick={() => handleAtivar(id_animal)}>ATIVAR: - {id_animal}</li> : ""}
                <br />
            </ul>
        </>
    )


}

export default AnimaisList;
