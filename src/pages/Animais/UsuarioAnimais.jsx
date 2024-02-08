import AnimaisList from "../../components/Animais/AnimaisList";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import Loading from "../../components/Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useState, useEffect, useContext } from "react";

function UsuarioAnimais() {
  const [animais, setAnimais] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    async function getAnimais() {
      let response = await apiFetch("usuario/animais", "get");
      if (response.data != undefined) {
        setAnimais(response.data);
      }
    }

    getAnimais();
  }, []);

  const handleDelete = async (id_animal) => {
    let response = await apiFetch(`animais/${id_animal}`, "delete");

    if (response.data.code == 400) {
      alert(response.data.message);
    }

    if (response.data === 1) {
      toast.success("Excluído com Sucesso !!");
      setAnimais((prev) =>
        prev.filter((animal) => animal.id_animal != id_animal)
      );
    }
  };

  const handleAdotado = async (id_animal, adotado) => {
    const adotar = adotado == 1 ? 0 : 1;

    let response = await apiFetch(`animais/${id_animal}/adotado`, "patch", {
      adotado: adotar,
    });

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.code === 200) {
      const animal = animais.map((animal) =>
        animal.id_animal === id_animal ? { ...animal, adotado: adotar } : animal
      );

      setAnimais((prev) => animal);

      let message =
        adotar == 1
          ? "Adotado com Sucesso !!"
          : "Animal disponível novamente para a adoção";

      toast.success(message);
    }
  };

  const handleDesativar = async (id_animal) => {
    let response = await apiFetch(`animais/desativar/${id_animal}`, "patch");

    if (response.data.code == 400) {
      alert(response.data.message);
    }

    if (response.code === 200) {
      const animal = animais.map((animal) =>
        animal.id_animal === id_animal
          ? { ...animal, dt_inativacao: response.data.data.dt_inativacao }
          : animal
      );

      setAnimais((prev) => animal);

      toast.success("Desativado com Sucesso !!");
    }
  };

  const handleAtivar = async (id_animal) => {
    let response = await apiFetch(`animais/ativar/${id_animal}`, "patch");

    if (response.data.code == 400) {
      toast.warning(response.data.message);
    }

    if (response.code === 200) {
      const animal = animais.map((animal) =>
        animal.id_animal === id_animal
          ? { ...animal, dt_inativacao: response.data.data.dt_inativacao }
          : animal
      );

      setAnimais((prev) => animal);

      toast.success("Ativado com Sucesso !!");
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Meus Animais" />

      {loadingApi ? (
        <Loading />
      ) : animais.length > 0 ? (
        <div className="w-[100%] p-3">
          {animais.map((animal) => (
            <div key={animal.id_animal}>
              <AnimaisList
                animal={animal}
                respostaDenuncia={animal.respostaDenuncia}
                handleDelete={handleDelete}
                handleAdotado={handleAdotado}
                handleDesativar={handleDesativar}
                handleAtivar={handleAtivar}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex w-[100%] h-screen justify-center items-center">
          <h1 className="text-lg font-bold p-3 my-5">Sem Animais...</h1>
        </div>
      )}

      <Footer />
    </>
  );
}

export default UsuarioAnimais;
