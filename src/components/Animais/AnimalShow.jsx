import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import CreateDenuncia from "../../pages/Denuncias/CreateDenuncia";
import { toast } from 'react-toastify';

function AnimalShow() {

    let { id_animal } = useParams();

    const { loadingApi, apiFetch } = useContext(Context);
    const [animal, setAnimal] = useState([]);
    console.log("🚀 ~ file: AnimalShow.jsx:15 ~ AnimalShow ~ animal:", animal)
    const [user, setUser] = useState({ id_usuario: '', nome: "" })

    useEffect(() => {

        getAnimais();

        if (localStorage.getItem("user") != undefined) {
            setUser((prev) => JSON.parse(localStorage.getItem("user")));
        }

    }, []);

    async function getAnimais() {
        let response = await apiFetch(`animais/${id_animal}`, "get")
        if (response.data != undefined) {
            setAnimal(response.data);
        }
    }

    const removerFavorito = async (id_favorito) => {

        let response = await apiFetch(`animais/favoritos/${id_favorito}`, "delete")

        if (response.data.code == 400) {
            toast.warning(response.data.message)
        }

        if (response.code === 200) {

            setAnimal({ ...animal, favoritoUsuario: [] })

            toast.success("Removido dos favoritos com Sucesso !!");
        }

    }

    const favoritar = async (id_animal) => {

        let data = {
            "id_usuario": user.id_usuario,
            "id_animal": id_animal
        }

        let response = await apiFetch(`/animais/favoritos`, "post", data)

        if (response.data.code == 400) {
            toast.warning(response.data.message)
        }

        if (response.code === 201) {

            setAnimal({
                ...animal,
                favoritoUsuario: [response.data.data]
            })

            toast.success("Favoritado !!");
        }

    }


    return (
        <>

            <h1>Animal Detalhes</h1>

            <NavBar />

            {loadingApi || animal.length == 0 ? <Loading /> : (<>
                <p>
                    {animal.fotos?.map((foto) => {
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
                <p><b>Sexo:</b> {animal.sexo}</p>
                <p><b>Idade:</b> {animal.idade} {animal.idade < 2 ? 'Ano' : 'Anos'}</p>
                <p><b>Categoria:</b> {animal.categoria.descricao}</p>
                <p><b>Porte:</b> {animal.porte.descricao}</p>
                <p><b>Descrição:</b> {animal.descricao}</p>

                <br />

                <p><b>ID:</b> {animal.usuario.id_usuario}</p>
                <p><b>Dono:</b> {animal.usuario.nome}</p>
                <p><b>E-mail:</b> {animal.usuario.email}</p>
                <p><b>Contatos:</b></p>
                <div>
                    {animal.usuario.contatos.map((contato) => (
                        contato.principal === 1 && (
                            <div key={contato.id_contato}>
                                <p><b>Numero:</b> ({contato.dd}) {contato.numero}</p>
                            </div>
                        )
                    ))}
                </div>
                <p><b>Endereços:</b></p>
                <div>
                    {animal.usuario.enderecos.map((endereco) => (
                        endereco.principal === 1 && (
                            <div key={endereco.id_endereco}>
                                <p><b>CEP:</b>{endereco.cep}</p>
                                <p><b>Bairro:</b>{endereco.bairro}</p>
                                <p><b>Numero:</b>{endereco.numero}</p>
                                <p><b>Complemento:</b>{endereco.complemento}</p>
                            </div>
                        )
                    ))}
                </div>

                <br />
                <p>
                    {user.id_usuario == animal.usuario.id_usuario ? '' : <Link to={`/denuncias/${animal.usuario.id_usuario}/${animal.id_animal}/cadastrar`}>Denunciar</Link>}
                </p>
                <br />
                <ul>
                    {animal.favoritoUsuario.length > 0 ?
                        <li onClick={() => removerFavorito(animal?.favoritoUsuario[0].id_favorito)}>REMOVER FAVORITAR: - {animal.favoritoUsuario[0].id_favorito}</li> :
                        <li onClick={() => favoritar(animal.id_animal)}>FAVORITAR: - {animal.id_animal}</li>
                    }
                </ul>
                <hr />

            </>)}
        </>
    )


}

export default AnimalShow;
