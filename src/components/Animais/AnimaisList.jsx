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
            {/* <ul >
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
            </ul> */}

            {/* <div className="bg-[#86A7FC] w-[100%] h-screen p-3 flex"> */}

            <div className="bg-[#ffffff] w-[100%] rounded shadow-lg m-3 flex flex-col lg:flex-row justify-between p-5">

                <div className="w-[100%] lg:w-[50%] flex flex-col lg:flex-row">

                    {
                        fotos.length == 0 ? <h1>Sem Imagens</h1> : fotos.map((foto) => {
                            return (
                                <img
                                    className="w-[100%] lg:w-[50%] h-[100%] p-1 object-cover"
                                    key={foto.nome_arquivo}
                                    src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                                    width={'100px'}
                                />
                            )
                        })
                    }

                    <div className="p-3">
                        <p className="text-lg">{nome}</p>
                        <p className="text-sm my-1">{idade} Ano{idade > 1 ? 's' : ''}</p>
                        <div>
                            <span className="text-sm my-1 mr-1">{sexo == 'M' ? 'Macho' : 'Fêmea'}</span>
                            <span className="text-sm my-1 mr-1">{categoria}</span>
                            <span className="text-sm my-1 mr-1">{porte}</span>
                        </div>
                        <p className="text-sm my-1">{usuario.nome}</p>
                        <p className="text-sm my-1">{adotado}</p>
                        <p className="text-sm my-1 break-all">{descricao}</p>
                    </div>
                </div>

                <div className="w-[100%] lg:w-[50%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap items-start lg:items-end">

                    {dt_inativacao ? "" : <Link
                        to={`/animais/editar/${id_animal}`}
                        className="botao m-1 text-black bg-[#FAEF5D] hover:bg-[--color-secundaria] hover:text-black w-[45%]"
                        type="submit"
                    >Editar</Link>}

                    <button
                        onClick={() => handleDelete(id_animal)}
                        className="botao m-1 text-white bg-[--color-terciario] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                        type="submit"
                    >Deletar</button>

                    {dt_inativacao ? "" : <button
                        onClick={() => handleAdotado(id_animal, adotado)}
                        className="botao m-1 text-white bg-[#864AF9] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                        type="submit"
                    >{adotado == 0 ? "Adotar" : "Remover Adoção"}</button>
                    }

                    {dt_inativacao ? "" :
                        <button
                            onClick={() => handleDesativar(id_animal)}
                            className="botao m-1 text-white bg-[#7E2553] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                            type="submit"
                        >Desativar</button>
                    }

                    {dt_inativacao ? "" :
                        <button
                            onClick={() => handleAtivar(id_animal)}
                            className="botao m-1 text-white bg-[#FF9800] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                            type="submit"
                        >Ativar</button>
                    }
                </div>

            </div>

            {/* </div> */}

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
