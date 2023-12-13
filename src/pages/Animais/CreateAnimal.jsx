import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { toast } from "react-toastify";

function CreateAnimal() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let animalData = new FormData(document.getElementById("createAnimal"));

        console.log("🚀 ~ file: CreateAnimal.jsx:26 ~ create ~ animalData:", animalData)

        let response = await apiFetch(`animais`, "post", animalData)

        console.log("🚀 ~ file: CreateAnimal.jsx:32 ~ create ~ response:", response)
        
        if (response.code == 201) {
            toast.success('Cadastrado com sucesso')
            navigate("/usuario/animais");
        } else {
            // alert(response.data.message)
            setErrosApi(response.data.errors);
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

            <h1>Criar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createAnimal'>

                <Input
                    label='Nome'
                    typeInput='text'
                    placeholder='Preencha seu nome'
                    name='nome'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.nome}
                />

                <Input
                    label='Descrição'
                    typeInput='text'
                    placeholder='Preencha sua Descrição'
                    name='descricao'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.descricao}
                />

                <PorteAnimal
                    label="Porte Animal"
                    name="id_porte"
                    register={register}
                />

                <Categorias
                    label="Categorias"
                    name="id_categoria"
                    register={register}
                />

                <Input
                    label='Idade'
                    typeInput='date'
                    placeholder='Preencha sua Idade'
                    name='idade'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.idade}
                />

                <label htmlFor="">Sexo</label>
                <br /><br />

                <Input
                    label='M'
                    typeInput='radio'
                    value="M"
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.sexo}
                />

                <Input
                    label='F'
                    typeInput='radio'
                    value="F"
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.sexo}
                />

                <br />

                <Input
                    label='Imagens'
                    typeInput='file'
                    name='imagens[]'
                    id='imagens'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.imagens}
                    onChange={previewFiles}
                />

                <br />

                <div id="previews">Preview</div>

                <br /><br />

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

export default CreateAnimal;
