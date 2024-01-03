import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

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
                <li><b>Dono:</b> {usuario.nome}</li>
                <li><b>Adotado:</b> {adotado}</li>
                <li><b>Sexo:</b> {sexo}</li>
                <li><b>Descricao:</b> {descricao}</li>
                <li><b>Categoria:</b> {categoria}</li>
                <li><b>Idade:</b> {idade} Ano(s)</li>
                <li><b>Porte:</b> {porte}</li>
                <li><b>Fotos:</b></li>
                <li>
                    {
                        fotos.length == 0 ? <h1>Sem Imagens</h1> : fotos.map((foto) => {
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
                {/* <li>
                    <Link to={`/denuncias/${usuario.id_usuario}/${id_animal}/cadastrar`}>Denunciar</Link>
                </li> */}
            </ul>
        </>
    )


}

AnimaisList.propTypes = {
    id_animal: PropTypes.number.isRequired,
    dt_inativacao: PropTypes.string,
    nome: PropTypes.string.isRequired,
    usuario: PropTypes.shape({
        id_usuario: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
    }).isRequired,
    adotado: PropTypes.number.isRequired,
    sexo: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    idade: PropTypes.number.isRequired,
    porte: PropTypes.string.isRequired,
    fotos: PropTypes.arrayOf(
        PropTypes.shape({
            nome_arquivo: PropTypes.string,
            url: PropTypes.string,
            nome_arquivo_original: PropTypes.string
        })
    ).isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleAdotado: PropTypes.func.isRequired,
    handleDesativar: PropTypes.func.isRequired,
    handleAtivar: PropTypes.func.isRequired,
};

export default AnimaisList;
