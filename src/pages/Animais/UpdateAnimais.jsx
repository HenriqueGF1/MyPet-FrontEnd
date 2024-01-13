import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../components/Loading/Loading";
import MessageValidation from "../../components/Validation/MessageValidation";
import ErrosField from "../../components/Validation/errosField";

function UpdateAnimais() {

    let navigate = useNavigate();

    let { id_animal } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`animais/${id_animal}`, "get")
            return {
                id_animal: response.data.id_animal,
                nome: response.data.nome,
                descricao: response.data.descricao,
                idade: response.data.idadeEUA,
                sexo: response.data.sexo,
                id_categoria: response.data.id_categoria,
                id_porte: response.data.id_porte,
            }
        }
    });

    const edit = async (data) => {

        let response = await apiFetch(`animais/${data.id_animal}`, "patch", data)

        if (response.code == 200) {
            toast.success('Editado com Sucesso !!')
            navigate("/animais");
        } else {
            setErrosApi(response.data.errors);
            // toast.warning('Atenção');
        }

    };

    return (
        <>

            <NavBar />

            <form onSubmit={handleSubmit(edit)} id="editAnimal">

                <div className="bg-[--color-fundo] w-[100%] flex flex-col justify-center items-center">

                    <div className="bg-[--color-card] w-[95%] lg:w-1/2 my-5 p-3 rounded shadow-2xl">
                        <div>
                            <h1 className="text-center text-3xl font-bold p-3 my-5">Editar Animal</h1>
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

                            {/* <div className="p-3">

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

                            </div> */}

                            {
                                loadingApi ? <h1>Carregando...</h1> : (<>

                                    <div className="w-[100%] my-3 flex justify-around">
                                        <button
                                            className="botao text-white bg-[--color-principal] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                                            type="submit"
                                        >Enviar</button>

                                        <button
                                            className="botao text-white bg-[--color-terciario] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                                            type="submit"
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

export default UpdateAnimais;
