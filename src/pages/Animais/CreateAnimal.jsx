import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { toast } from "react-toastify";
import MessageValidation from "../../components/Validation/MessageValidation";
import ErrosField from "../../components/Validation/errosField";

function CreateAnimal() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState({})
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let animalData = new FormData(document.getElementById("createAnimal"));

        let response = await apiFetch(`animais`, "post", animalData)

        if (response.code == 201) {
            toast.success('Cadastrado com sucesso')
            navigate("/usuario/animais");
            return
        } 
        
        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })
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

                <div className="form-group">
                    <label>Nome</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha seu Nome"
                        {...register("nome", { required: true })}
                    />
                    {errosApi.erro?.nome && <ErrosField errosApi={errosApi} field='nome' />}
                    {errors.nome && MessageValidation('nome', errors.nome.type)}
                </div>

                <div className="form-group">
                    <label>Descrição</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha sua Descrição"
                        {...register("descricao", { required: true })}
                    />
                    {errosApi.erro?.descricao && <ErrosField errosApi={errosApi} field='descricao' />}
                    {errors.descricao && MessageValidation('descricao', errors.descricao.type)}
                </div>

                <PorteAnimal
                    label="Porte Animal"
                    name="id_porte"
                    register={register}
                    errors={errosApi.erro?.id_porte}
                    errosApi={errors.id_porte?.type}
                />

                <Categorias
                    label="Categorias"
                    name="id_categoria"
                    register={register}
                />

                <div className="form-group">
                    <label>Idade</label><br></br>
                    <input
                        type="date"
                        {...register("idade", { required: true })}
                    />
                    {errosApi.erro?.idade && <ErrosField errosApi={errosApi} field='idade' />}
                    {errors.idade && MessageValidation('idade', errors.idade.type)}
                </div>

                <div className="form-group">
                    <label>Sexo</label><br></br>

                    <br></br><label>M</label><br></br>
                    <input
                        type="radio"
                        value="M"
                        {...register("sexo", { required: true })}
                    />
                    {errosApi.erro?.sexo && <ErrosField errosApi={errosApi} field='sexo' />}
                    {errors.sexo && MessageValidation('sexo', errors.sexo.type)}

                    <br></br><label>F</label><br></br>
                    <input
                        type="radio"
                        value="F"
                        {...register("sexo", { required: true })}
                    />
                    {errosApi.erro?.sexo && <ErrosField errosApi={errosApi} field='sexo' />}
                    {errors.sexo && MessageValidation('sexo', errors.sexo.type)}
                </div>

                <br />

                <div className="form-group">
                    <label>Imagens</label><br></br>
                    <input
                        id='imagens'
                        type="file"
                        {...register("imagens[]", { required: true })}
                        onChange={() => previewFiles()}
                    />
                    {errosApi.erro?.imagens && <ErrosField errosApi={errosApi} field='imagens' />}
                    {errors.imagens && MessageValidation('imagens', errors.imagens.type)}
                </div>

                <br />

                <div id="previews">Preview</div>

                <br /><br />

                {
                    loadingApi ? <h1>Carregando...</h1> : (<>

                        <div className="form-group">
                            <button type="submit">Enviar</button>
                            <button type="reset">Cancelar</button>
                        </div>

                    </>)
                }

            </form>

            <br /><br />

        </>
    );
}

export default CreateAnimal;
