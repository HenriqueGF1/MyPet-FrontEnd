import { useState, useEffect, useContext, useCallback } from "react";
import { Context } from "../../../context/apiContext";
import NavBar from "../../../components/NavBar/NavBar";
import Loading from '../../../components/Loading/Loading'
import { toast } from 'react-toastify';
import FavoritosList from "../../../components/Favoritos/FavoritosList";

function Favoritos() {

    const [favoritos, setFavoritos] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    useEffect(() => {

        async function getFavoritos() {
            let response = await apiFetch(`animais/favoritos`, "get")
            console.log("🚀 ~ file: Favoritos.jsx:18 ~ getFavoritos ~ response:", response)
            if (response.data != undefined) {
                setFavoritos(response.data);
            }
        }

        getFavoritos();

    }, []);

    const handleFavorito = async (id_favorito) => {

        let response = await apiFetch(`animais/favoritos/${id_favorito}`, "delete")

        if (response.data.code == 400) {
            toast.warning(response.data.message);
        }

        if (response.data === 1) {
            toast.success("Removido com sucesso !!");
            setFavoritos((prev) => prev.filter((favorito) => favorito.id_contato != id_favorito))
        }
    }

    return (
        <>
            <h1>Animais Favoritos</h1>
            <br />
            <NavBar />
            <br />

            {loadingApi ? (
                <Loading />
            ) : favoritos.length > 0 ? (
                favoritos.map((favorito) => (
                    <div key={favorito.id_favorito}>
                        <FavoritosList
                            animal={favorito.animal}
                            id_favorito={favorito.id_favorito}
                            handleFavorito={handleFavorito}
                        />
                    </div>
                ))
            ) : (
                <h1>Sem Favoritos...</h1>
            )}
        </>
    )


}

export default Favoritos;
