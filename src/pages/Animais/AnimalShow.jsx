import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { toast } from 'react-toastify';
import AnimalDetalhes from "../../components/Animais/AnimalDetalhes";
import Loading from "../../components/Loading/Loading";
import CreateDenuncia from "../Denuncias/CreateDenuncia";

function AnimalShow() {

    let { id_animal } = useParams();

    const { loadingApi, apiFetch, authenticated } = useContext(Context);
    const [animal, setAnimal] = useState(null);
    const [user, setUser] = useState({ id_usuario: '', nome: "" })
    const [denunciar, setDenunciar] = useState(false);

    useEffect(() => {

        async function getAnimais() {
            let response = await apiFetch(`animais/${id_animal}`, "get")
            console.log("🚀 ~ file: AnimalShow.jsx:24 ~ getAnimais ~ response:", response)
            if (response.data != undefined) {
                setAnimal(response.data);
            }
        }

        getAnimais();

        if (localStorage.getItem("user") != undefined) {
            setUser((prev) => JSON.parse(localStorage.getItem("user")));
        }

    }, []);

    const removerFavorito = async (favorito) => {

        let response = await apiFetch(`animais/favoritos/${favorito.id_favorito}`, "delete")

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

            {animal === null ? <Loading /> : (

                <>

                    <AnimalDetalhes animal={animal}>

                        {authenticated ? (<>

                            <div>
                                <br />
                                <ul>
                                    {user.id_usuario !== animal.id_usuario && (
                                        <>

                                            <li onClick={() => setDenunciar(prev => !prev)}>
                                                DENUNCIAR
                                            </li>

                                            <br />

                                            <li onClick={() => (animal.favoritoUsuario.length > 0 ? removerFavorito(animal.favoritoUsuario[0]) : favoritar(animal.id_animal))}>
                                                {animal.favoritoUsuario.length > 0 ? `REMOVER FAVORITAR: - ${animal.favoritoUsuario[0].id_favorito}` : `FAVORITAR: - ${animal.id_animal}`}
                                            </li>

                                        </>
                                    )}
                                </ul>

                                <hr />
                            </div>

                        </>) : ''}

                    </AnimalDetalhes>

                    {denunciar ? <CreateDenuncia
                        id_usuario={animal.id_usuario}
                        id_animal={animal.id_animal}
                    /> : ''}

                </>

            )}

        </>
    )


}

export default AnimalShow;
