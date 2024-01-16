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
                    img.style.width = '200px';
                    img.style.maxHeight = '200px';

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

            <form onSubmit={handleSubmit(create)} id='createAnimal'>

                <div className="bg-[--color-fundo] w-[100%] flex flex-col justify-center items-center">

                    <div className="bg-[--color-card] w-[95%] lg:w-1/2 my-5 p-3 rounded shadow-2xl">
                        <div>
                            <h1 className="text-center text-3xl font-bold p-3 my-5">Cadastrar Animal</h1>
                        </div>

                        <div>
                            <div className="flex items-start">
                                <div className="p-3">

                                    <label className="label-padrao">
                                        Nome
                                    </label>
                                    <input
                                        className="input-padrao"
                                        type="text"
                                        placeholder="Preencha seu Nome"
                                        {...register("nome", { required: true })}
                                    />
                                    {errosApi.erro?.nome && <ErrosField errosApi={errosApi} field='nome' />}
                                    {errors.nome && MessageValidation('nome', errors.nome.type)}

                                </div>
                                <div className="p-3">

                                    <label className="label-padrao">
                                        Idade
                                    </label>
                                    <input
                                        className="input-padrao"
                                        type="date"
                                        {...register("idade", { required: true })}
                                    />
                                    {errosApi.erro?.idade && <ErrosField errosApi={errosApi} field='idade' />}
                                    {errors.idade && MessageValidation('idade', errors.idade.type)}

                                </div>


                            </div>

                            <div className="p-3 w-[100%]">

                                <label className="label-padrao">
                                    Sexo
                                </label>

                                <div className="flex justify-around">

                                    <div className="w-[50%]">
                                        <label className="label-padrao">
                                            M
                                        </label>
                                        <input
                                            type="radio"
                                            value="M"
                                            {...register("sexo", { required: true })}
                                        />
                                        <br />
                                        {errosApi.erro?.sexo && <ErrosField errosApi={errosApi} field='sexo' />}
                                        {errors.sexo && MessageValidation('sexo', errors.sexo.type)}
                                    </div>

                                    <div className="w-[50%]">
                                        <label className="label-padrao">
                                            F
                                        </label>
                                        <input
                                            type="radio"
                                            value="F"
                                            {...register("sexo", { required: true })}
                                        />
                                        <br />
                                        {errosApi.erro?.sexo && <ErrosField errosApi={errosApi} field='sexo' />}
                                        {errors.sexo && MessageValidation('sexo', errors.sexo.type)}
                                    </div>

                                </div>

                            </div>


                            <div className="flex items-start">

                                <div className="p-3">
                                    <PorteAnimal
                                        label="Porte Animal"
                                        name="id_porte"
                                        register={register}
                                        errors={errosApi.erro?.id_porte}
                                        errosApi={errors.id_porte?.type}
                                    />
                                </div>

                                <div className="p-3">
                                    <Categorias
                                        label="Categorias"
                                        name="id_categoria"
                                        register={register}
                                    />
                                </div>

                            </div>

                            <div className="p-3">

                                <label className="label-padrao">
                                    Descrição
                                </label>
                                <textarea
                                    className="input-padrao"
                                    type="text"
                                    cols='60'
                                    rows='7'
                                    placeholder="Preencha sua Descrição"
                                    {...register("descricao", { required: true })}
                                />
                                {errosApi.erro?.descricao && <ErrosField errosApi={errosApi} field='descricao' />}
                                {errors.descricao && MessageValidation('descricao', errors.descricao.type)}

                            </div>

                            <div className="p-3">

                                <label className="label-padrao">
                                    Imagens
                                </label>
                                <input
                                    className="input-padrao"
                                    id='imagens'
                                    type="file"
                                    {...register("imagens[]", { required: true })}
                                    onChange={() => previewFiles()}
                                />
                                {errosApi.erro?.imagens && <ErrosField errosApi={errosApi} field='imagens' />}
                                {errors.imagens && MessageValidation('imagens', errors.imagens.type)}

                                <div id="previews" className="w-[100%]"></div>

                            </div>

                            {
                                loadingApi ? <h1>Carregando...</h1> : (<>

                                    <div className="w-[100%] my-3 flex justify-around">
                                        <button
                                            className="botao text-white bg-[--color-principal] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                                            type="submit"
                                        >Enviar</button>

                                        <button
                                            className="botao text-white bg-[--color-terciario] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                                            type="reset"
                                        >Cancelar</button>
                                    </div>

                                </>)
                            }
                        </div>

                    </div>

                </div>

            </form>

        </>
    );
}

export default CreateAnimal;
