import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import TipoDenucia from "../../components/TipoDenucia/TipoDenucia";
import Loading from "../../components/Loading/Loading";
import AnimalDetalhes from "../../components/Animais/AnimalDetalhes";
import PropTypes from 'prop-types';
import MessageValidation from "../../components/Validation/MessageValidation";
import ErrosField from "../../components/Validation/errosField";
import { toast } from "react-toastify";

function CreateDenuncia({ id_usuario, id_animal }) {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let usuario = JSON.parse(localStorage.getItem("user"));

        let dados = {
            id_animal: id_animal,
            id_usuario_denunciante: usuario.id_usuario,
            id_usuario: id_usuario,
            descricao: data.descricao,
            id_tipo: data.id_tipo,
        }

        let response = await apiFetch(`animais/denuncias`, "post", dados)

        console.log("🚀 ~ file: CreateDenuncia.jsx:43 ~ create ~ response:", response)

        if (response.code == 201) {
            toast.success('Cadastrado com sucesso')
            navigate("/minhas/denuncias");
        } else {
            setErrosApi({
                "code": response.code,
                "erro": response.data.errors,
            })
        }
    }

    return (
        <>

            <h1>Denunciar Animal</h1>

            {/* <NavBar /> */}

            {/* {loadingApi || id_animal === null ? <Loading /> : (
                <AnimalDetalhes animal={id_animal}>

                </AnimalDetalhes>
            )} */}

            <form onSubmit={handleSubmit(create)} id='createAnimal'>

                <div className="form-group">
                    <label>Descrição</label><br></br>
                    <input
                        type="text"
                        placeholder='Preencha sua Descrição'
                        {...register("descricao", { required: true })}
                    />
                    {errosApi.erro?.descricao && <ErrosField errosApi={errosApi} field='descricao' />}
                    {errors.descricao && MessageValidation('descricao', errors.descricao.type)}
                </div>

                <TipoDenucia
                    label="Tipo de Denuncia"
                    name="id_tipo"
                    register={register}
                />

                <br />

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

CreateDenuncia.propTypes = {
    id_usuario: PropTypes.number.isRequired,
    id_animal: PropTypes.number.isRequired,
};

export default CreateDenuncia;
