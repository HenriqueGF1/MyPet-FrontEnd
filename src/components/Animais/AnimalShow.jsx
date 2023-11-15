import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

function AnimalShow() {

    let { id_animal } = useParams();

    const { loadingApi, apiFetch } = useContext(Context);
    const [animal, setAnimal] = useState([]);


    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch(`animais/${id_animal}`, "get")
            console.log("🚀 ~ file: Animais.jsx:19 ~ getAnimais ~ response:", response)
            if (response.data != undefined) {
                setAnimal(response.data);
            }
        }

        getAnimais();

    }, []);

    console.log("🚀 ~ file: AnimalShow.jsx:28 ~ AnimalShow ~ loadingApi:", loadingApi)

    if (loadingApi) {
        console.log('AAA', animal)
    } else {
        console.log('Carregando')
    }

    return (
        <>

            <h1>Animal Detalhes</h1>

            <NavBar />

            {loadingApi || animal.length == 0 ? "Carregando" : (<>
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
                    <Link to={`/denuncias/${animal.usuario.id_usuario}/${animal.id_animal}/cadastrar`}>Denunciar</Link>
                </p>
                <br />
                <hr />
            </>)}
        </>
    )


}

export default AnimalShow;
