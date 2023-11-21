import { Link } from "react-router-dom";

function AnimaisCards({ animal }) {

    return (
        <>
            <p>
                {animal.fotos.map((foto) => {
                    return (
                        <img
                            key={foto.nome_arquivo}
                            src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                            width={'100px'}
                        />
                    )
                })}
            </p>
            <p><b>Nome:</b> {animal.nome}</p>
            <p><b>Descricao:</b> {animal.descricao}</p>
            <p><b>Categoria:</b> {animal.categoria.descricao}</p>
            <p><b>Porte:</b> {animal.porte.descricao}</p>
            <br />
            <p>
                <Link to={`/animais/${animal.id_animal}`}>Ver Detalhes...</Link>
            </p>
            <br />
            <hr />
        </>
    )


}

export default AnimaisCards;
