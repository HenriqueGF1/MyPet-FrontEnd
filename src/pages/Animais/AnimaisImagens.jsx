import { useState, useEffect, useContext } from "react";
import { Context } from "../../context/apiContext";
import { useForm } from "react-hook-form";
import NavBar from "../../components/NavBar/NavBar";
import Loading from '../../components/Loading/Loading'
import { Link, useParams } from "react-router-dom";
import AnimalDetalhes from '../../components/Animais/AnimalDetalhes'
import Input from "../../components/Form/Input";
import { toast } from "react-toastify";

function AnimaisImagens() {

    let { id_animal } = useParams();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [errosApi, setErrosApi] = useState([])

    const [animalFotos, setAnimalFotos] = useState(null);
    const [animal, setAnimal] = useState(null);
    console.log("🚀 ~ file: AnimaisImagens.jsx:24 ~ AnimaisImagens ~ animalFotos:", animalFotos)
    const { loadingApi, apiFetch } = useContext(Context);

    const getAnimalFotos = async () => {
        let response = await apiFetch(`animais/${id_animal}/fotos`, "get")
        if (response.data != undefined) {
            setAnimalFotos(response.data);
        }
    }
    const getAnimalAnimal = async () => {
        let response = await apiFetch(`animais/${id_animal}`, "get")
        console.log("🚀 ~ file: AnimaisImagens.jsx:37 ~ getAnimalAnimal ~ response:", response)
        if (response.data != undefined) {
            setAnimal(response.data);
        }
    }

    useEffect(() => {

        getAnimalAnimal();
        getAnimalFotos();

    }, []);

    const cadastrar = async (data) => {

        let animalData = new FormData(document.getElementById("animalFotos"));
        animalData.set('id_animal', animal.id_animal);
        animalData.delete('fotos');

        let response = await apiFetch(`animais/fotos`, "post", animalData)

        if (response.code == 200) {
            toast.success(`Cadastrado com sucesso !!`)
            getAnimalFotos();
        } else {
            toast.warning(response.data.message)
            setErrosApi(response.data.errors);
        }
    }

    const substituir = async (data) => {

        const checkboxesMarcados = document.querySelectorAll('input[type="checkbox"]:checked');
        const idsMarcados = Array.from(checkboxesMarcados).map(checkbox => checkbox.value);

        let animalData = new FormData(document.getElementById("animalFotos"));
        animalData.set('id_animal', animalFotos[0].animal.id_animal);
        animalData.set('id_foto_animal', idsMarcados.join(','));
        animalData.delete('fotos');

        let response = await apiFetch(`animais/${animalFotos[0].animal.id_animal}/fotos/atualizar`, "post", animalData)

        console.log("🚀 ~ file: AnimaisImagens.jsx:55 ~ substituir ~ response:", response)

        if (response.code == 200) {
            toast.success(`Substituído com sucesso !!`)
            getAnimalFotos();
        } else {
            toast.warning(response.data.message)
        }
    }

    const excluir = async (data) => {

        const checkboxesMarcados = document.querySelectorAll('input[type="checkbox"]:checked');
        const idsMarcados = Array.from(checkboxesMarcados).map(checkbox => Number(checkbox.value));

        let response = await apiFetch(`animais/fotos/${idsMarcados}`, "delete")

        console.log("🚀 ~ file: AnimaisImagens.jsx:54 ~ excluir ~ response:", response)

        if (response.code == 200) {
            toast.success(`Deletado com sucesso !!`)
            getAnimalFotos();
        } else {
            toast.warning(response.data.message)
        }
    }

    function previewFiles() {
        const fileInput = document.getElementById('imagens');
        const previewsContainer = document.getElementById('previews');
        previewsContainer.innerHTML = ''; // Limpa previews anteriores

        // Verifica se o navegador suporta a API FileReader
        if (window.FileReader) {
            Array.from(fileInput.files).forEach(file => {
                const reader = new FileReader();

                reader.onload = function (e) {
                    // Cria uma nova imagem de prévia para cada arquivo
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.width = '300px';
                    img.style.maxHeight = '300px';

                    // Adiciona a imagem de prévia ao contêiner
                    previewsContainer.appendChild(img);
                };

                // Lê o conteúdo do arquivo como uma URL de dados
                reader.readAsDataURL(file);
            });
        } else {
            // Fallback para navegadores que não suportam FileReader
            alert('Seu navegador não suporta a visualização de arquivos.');
        }
    }

    return (
        <>
            <NavBar />

            <h1>AnimaisImagens</h1>

            {loadingApi || animalFotos === null || animal === null ? <Loading /> : (

                <>

                    <>
                        <AnimalDetalhes animal={animal}>
                        </AnimalDetalhes>
                        <br />

                        <form id="animalFotos">

                            {animalFotos.length < 1 ? <div><p>Sem Animais</p><br /></div> : (
                                (<>
                                    <p>Selecione as imagen(s) para Substituir ou Excluir</p><br />
                                    {animalFotos.map((foto) => {
                                        return (
                                            <div key={foto.nome_arquivo}>
                                                <img
                                                    src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                                                    width={'150px'}
                                                />
                                                <Input
                                                    label=''
                                                    typeInput='checkbox'
                                                    name='fotos'
                                                    id={`foto${foto.id_foto_animal}`}
                                                    value={foto.id_foto_animal}
                                                    register={register}
                                                    validation={{ required: false }}
                                                    errors={errors}
                                                    apiErros={errosApi.imagens}
                                                />
                                            </div>
                                        )
                                    })}
                                </>)
                            )}

                            <br />

                            <Input
                                label='Imagens'
                                typeInput='file'
                                name='imagens[]'
                                id='imagens'
                                register={register}
                                validation={{ required: false }}
                                errors={errors}
                                apiErros={errosApi.imagens}
                                onChange={previewFiles}
                            />

                            <div id="previews">Preview</div><br /><br />

                            <button type="button" id="cadastrar" onClick={handleSubmit(cadastrar)}>Cadastrar</button>
                            <button type="button" id="substituir" onClick={handleSubmit(substituir)}>Substituir</button>
                            <button type="button" id="excluir" onClick={handleSubmit(excluir)}>Excluir</button>
                        </form>

                        <br /><br /><br /><br /><br />
                    </>

                </>

            )}


        </>
    )
}

export default AnimaisImagens;