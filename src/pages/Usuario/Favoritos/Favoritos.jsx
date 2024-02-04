import FavoritosList from "../../../components/Favoritos/FavoritosList";
import Footer from "../../../components/Footer/Footer";
import HeaderPages from "../../../components/HeaderPages/HeaderPages";
import Loading from "../../../components/Loading/Loading";
import NavBar from "../../../components/NavBar/NavBar";
import { Context } from "../../../context/Context";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getFavoritos() {
      let response = await apiFetch(`animais/favoritos`, "get");
      if (response.data != undefined) {
        setFavoritos(response.data);
      }
    }

    getFavoritos();
  }, []);

  const handleFavorito = async (id_favorito) => {
    let response = await apiFetch(`animais/favoritos/${id_favorito}`, "delete");

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.data === 1) {
      toast.success("Removido com sucesso !!");
      setFavoritos((prev) =>
        prev.filter((favorito) => favorito.id_favorito != id_favorito)
      );
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Animais Favoritos" />

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
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem Favoritos...</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default Favoritos;
