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
            <h1>Editar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(edit)} id="editAnimal">

                <div className="form-group">
                    <label>Nome</label><br></br>
                    <input
                        type="text"
                        placeholder="Preencha seu nome..."
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

                {
                    loadingApi ? <h1>Carregando...</h1> : (<>

                        <div className="form-group">
                            <button type="submit">Enviar</button>
                            {/* <button type="reset">Cancelar</button> */}
                        </div>

                    </>)
                }

            </form>

            <br /><br />
            <Link to={`/animais/editar/imagens/${id_animal}`}>EDITAR IMAGENS: - {id_animal}</Link>

            <br /><br /><br /><br /><br />

        </>
    );
}

export default UpdateAnimais;
