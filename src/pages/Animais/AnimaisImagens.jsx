import AnimalDetalhes from "../../components/Animais/AnimalDetalhes";
import ErrosField from "../../components/Validation/errosField";
import Footer from "../../components/Footer/Footer";
import HeaderPages from "../../components/HeaderPages/HeaderPages";
import Loading from "../../components/Loading/Loading";
import MessageValidation from "../../components/Validation/MessageValidation";
import NavBar from "../../components/NavBar/NavBar";
import { Context } from "../../context/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { previewFiles } from "../../services/previewImagem";

function AnimaisImagens() {
  let { id_animal } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { fotos: false } });

  const [errosApi, setErrosApi] = useState([]);
  const [animalFotos, setAnimalFotos] = useState(null);
  const [animal, setAnimal] = useState(null);
  const { loadingApi, apiFetch } = useContext(Context);

  const getAnimalFotos = async () => {
    let response = await apiFetch(`animais/${id_animal}/fotos`, "get");
    if (response.data != undefined) {
      setAnimalFotos(response.data);
    }
  };

  const getAnimalAnimal = async () => {
    let response = await apiFetch(`animais/${id_animal}`, "get");
    if (response.data != undefined) {
      setAnimal(response.data);
    }
  };

  useEffect(() => {
    getAnimalAnimal();
    getAnimalFotos();
  }, []);

  const cadastrar = async (data) => {
    let animalData = new FormData(document.getElementById("animalFotos"));
    animalData.set("id_animal", id_animal);
    animalData.delete("fotos");

    let arquivo = animalData.get("imagens[]");

    if (arquivo.name == "") {
      toast.error("Adicione um arquivo");
      return;
    }

    let response = await apiFetch(`animais/fotos`, "post", animalData);

    if (response.code == 200) {
      toast.success(`Cadastrado com sucesso !!`);
      getAnimalAnimal();
      getAnimalFotos();
    } else {
      toast.warning(response.data.message);
      setErrosApi(response.data.errors);
    }
  };

  const substituir = async (data) => {
    const checkboxesMarcados = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const idsMarcados = Array.from(checkboxesMarcados).map(
      (checkbox) => checkbox.value
    );

    let animalData = new FormData(document.getElementById("animalFotos"));
    animalData.set("id_animal", id_animal);
    animalData.set("id_foto_animal", idsMarcados.join(","));
    animalData.delete("fotos");

    let arquivo = animalData.get("imagens[]");

    if (arquivo.name == "") {
      toast.error("Adicione um arquivo");
      return;
    }

    let response = await apiFetch(
      `animais/${animalFotos[0].animal.id_animal}/fotos/atualizar`,
      "post",
      animalData
    );

    if (response.code == 200) {
      toast.success(`Substituído com sucesso !!`);
      getAnimalAnimal();
      getAnimalFotos();
    } else {
      toast.warning(response.data.message);
    }
  };

  const excluir = async (data) => {
    const checkboxesMarcados = document.querySelectorAll(
      'input[type="checkbox"]:checked'
    );
    const idsMarcados = Array.from(checkboxesMarcados).map((checkbox) =>
      Number(checkbox.value)
    );

    let animalData = new FormData(document.getElementById("animalFotos"));
    animalData.set("id_animal", id_animal);
    animalData.set("id_foto_animal", idsMarcados.join(","));
    animalData.delete("fotos");
    animalData.delete("imagens[]");

    let response = await apiFetch(
      `/animais/${id_animal}/fotos/apagar`,
      "post",
      animalData
    );

    if (response.code == 200) {
      toast.success(`Deletado com sucesso !!`);
      getAnimalAnimal();
      getAnimalFotos();
    } else {
      toast.warning(response.data.message);
    }
  };

  return (
    <>
      <NavBar />

      <HeaderPages tituloPagina="Animais Editar Imagens" />

      <div className="w-[100%] flex flex-col justify-center items-center">
        <div className="bg-[#FFFFFF] rounded shadow-md w-[90%] my-5 p-3">
          <div>
            <div className="flex items-start">
              <div className="p-3 w-[100%]"></div>
            </div>
          </div>

          {loadingApi || animalFotos === null || animal === null ? (
            <Loading />
          ) : (
            <>
              <AnimalDetalhes animal={animal}></AnimalDetalhes>

              <form id="animalFotos">
                <div className="m-3 p-3">
                  {animalFotos.length < 1 ? (
                    <div>
                      <p>Sem Imagens</p>
                    </div>
                  ) : (
                    <>
                      <p className="text-base	font-bold my-5">
                        Selecione a imagem(s) para Substituir ou Excluir
                      </p>

                      <div className="flex flex-col md:flex-row items-stretch justify-evenly">
                        {animalFotos.map((foto, index) => {
                          return (
                            <div key={foto.nome_arquivo}>
                              <img
                                src={`http://localhost:8000/${foto.url}`}
                                alt={foto.nome_arquivo_original}
                                width={"150px"}
                              />

                              <label
                                className={
                                  errosApi.erro?.fotos || errors.fotos
                                    ? "input-erro"
                                    : "input-padrao"
                                }
                              >
                                Imagem {index + 1} -{" "}
                                {foto.nome_arquivo_original}
                              </label>
                              <input
                                className={
                                  errosApi.erro?.fotos || errors.fotos
                                    ? "input-erro"
                                    : "input-padrao"
                                }
                                type="checkbox"
                                value={foto.id_foto_animal}
                                id={`foto_${foto.id_foto_animal}`}
                                {...register("fotos", { required: false })}
                              />
                              {errosApi.erro?.fotos && (
                                <ErrosField errosApi={errosApi} field="fotos" />
                              )}
                              {errors.fotos &&
                                MessageValidation("fotos", errors.fotos.type)}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}

                  <label
                    className={
                      errosApi.erro?.imagens || errors.imagens
                        ? "label-erro"
                        : "label-padrao"
                    }
                  >
                    Imagens
                  </label>
                  <input
                    className={
                      errosApi.erro?.imagens || errors.imagens
                        ? "input-erro"
                        : "input-padrao"
                    }
                    id="imagens"
                    type="file"
                    {...register("imagens[]", { required: false })}
                    onChange={() => previewFiles("imagens", "previews")}
                  />
                  {errosApi.erro?.imagens && (
                    <ErrosField errosApi={errosApi} field="imagens" />
                  )}
                  {errors.imagens &&
                    MessageValidation("imagens", errors.imagens.type)}

                  <div className="my-5">
                    <div id="previews"></div>
                  </div>

                  {loadingApi ? (
                    <h1>Carregando...</h1>
                  ) : (
                    <>
                      <div className="flex flex-col md:flex-row justify-between">
                        <button
                          id="cadastrar"
                          onClick={handleSubmit(cadastrar)}
                          className="botao btn-group text-white bg-[--color-principal] hover:bg-[--color-02] hover:text-black w-[100%]"
                          type="button"
                        >
                          Cadastrar
                        </button>

                        <button
                          id="substituir"
                          onClick={handleSubmit(substituir)}
                          className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02] hover:text-black w-[100%]"
                          type="button"
                        >
                          Substituir
                        </button>

                        <button
                          id="substituir"
                          onClick={handleSubmit(excluir)}
                          className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black w-[100%]"
                          type="button"
                        >
                          Excluir
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

export default AnimaisImagens;
