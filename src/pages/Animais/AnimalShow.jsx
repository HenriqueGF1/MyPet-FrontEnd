import AnimalDetalhes from "../../components/Animais/AnimalDetalhes";
import CreateDenuncia from "../Denuncias/CreateDenuncia";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

function AnimalShow() {
  let { id_animal } = useParams();

  const { loadingApi, apiFetch, authenticated } = useContext(Context);
  const [animal, setAnimal] = useState(null);
  const [user, setUser] = useState({ id_usuario: "", nome: "" });
  const [denunciar, setDenunciar] = useState(false);

  useEffect(() => {
    async function getAnimais() {
      let response = await apiFetch(`animais/${id_animal}`, "get");
      console.log("🚀 ~ getAnimais ~ response:", response)
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
    let response = await apiFetch(
      `animais/favoritos/${favorito.id_favorito}`,
      "delete"
    );

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.code === 200) {
      setAnimal({ ...animal, favoritoUsuario: [] });

      toast.success("Removido dos favoritos com Sucesso !!");
    }
  };

  const favoritar = async (id_animal) => {
    let data = {
      id_usuario: user.id_usuario,
      id_animal: id_animal,
    };

    let response = await apiFetch(`/animais/favoritos`, "post", data);

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.code === 201) {
      setAnimal({
        ...animal,
        favoritoUsuario: [response.data.data],
      });

      toast.success("Favoritado !!");
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Animal Detalhes" />

      <div className="bg-[#FFFFFF] rounded w-[100%] flex flex-col justify-center items-center min-h-screen">
        {animal === null ? (
          <Loading />
        ) : (
          <>
            <AnimalDetalhes animal={animal}>
              {authenticated ? (
                <>
                  <div>
                    <div className="w-[100%] flex justify-between items-end p-3">
                      {animal?.denunciasUsuario.length <= 0 ? (
                        user.id_usuario !== animal.id_usuario ? (
                          <>
                            <button
                              className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black w-[100%]"
                              type="submit"
                              onClick={() => setDenunciar((prev) => !prev)}
                            >
                              Denunciar
                            </button>

                            <button
                              className="botao btn-group text-white bg-[--color-04] hover:bg-[--color-02] hover:text-black w-[100%]"
                              type="reset"
                              onClick={() =>
                                animal.favoritoUsuario.length > 0
                                  ? removerFavorito(animal.favoritoUsuario[0])
                                  : favoritar(animal.id_animal)
                              }
                            >
                              {" "}
                              {animal.favoritoUsuario.length > 0
                                ? "Remover Favorito"
                                : "Favoritar"}
                            </button>
                          </>
                        ) : (
                          ""
                        )
                      ) : (
                        <p className="p-3 my-5 font-bold text-[--color-06]">
                          Você já denunciou esse animal.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
            </AnimalDetalhes>

            <div className="w-[100%]">
              {denunciar ? (
                <CreateDenuncia
                  id_usuario={animal.id_usuario}
                  id_animal={animal.id_animal}
                />
              ) : (
                ""
              )}
            </div>
          </>
        )}
      </div>

      <Footer />
    </>
  );
}

export default AnimalShow;
