import { Link } from "react-router-dom";

function AnimaisCards({ animal }) {

    return (
        <>
            <p><b>Nome:</b> {animal.nome}</p>
            <p><b>Dono:</b> {animal.usuario.nome}</p>
            <p><b>Sexo:</b> {animal.sexo}</p>
            <p><b>Descricao:</b> {animal.descricao}</p>
            <p><b>Categoria:</b> {animal.categoria.descricao}</p>
            <p><b>Idade:</b> {animal.idade}</p>
            <p><b>Porte:</b> {animal.porte.descricao}</p>
            <p>
                <b>Fotos:</b>
                <br />
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
            <p>
                <Link to={`/animais/${animal.id_animal}`}>Ver Detalhes...</Link>
            </p>
            <br />
            <hr />
        </>
    )


}

export default AnimaisCards;
