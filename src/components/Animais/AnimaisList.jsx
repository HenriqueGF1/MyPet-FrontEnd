function AnimaisList({ id_animal, nome, usuario, sexo, descricao, categoria, idade, porte, fotos, handleDelete }) {

    return (
        <>
            <ul >
                <li><b>Nome:</b> {nome}</li>
                <li><b>Dono:</b> {usuario}</li>
                <li><b>Sexo:</b> {sexo}</li>
                <li><b>Descricao:</b> {descricao}</li>
                <li><b>Categoria:</b> {categoria}</li>
                <li><b>Idade:</b> {idade}</li>
                <li><b>Porte:</b> {porte}</li>
                <li>
                    {/* <b>Fotos:</b>
                    {fotos.map((foto) => {
                        return (
                            <img
                                key={foto.nome_arquivo}
                                src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                                width={'100px'}
                            />
                        )
                    })} */}
                </li>
                <br />
                <li onClick={() => handleDelete(id_animal)}>DELETAR: - {id_animal}</li>
                <br />
            </ul>
        </>
    )


}

export default AnimaisList;
