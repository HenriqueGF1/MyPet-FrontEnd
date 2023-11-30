import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import TipoDenucia from "../../components/TipoDenucia/Categorias";
import Loading from "../../components/Loading/Loading";

function CreateDenuncia() {

    let navigate = useNavigate();
    let { id_usuario, id_animal } = useParams();

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

        if (response.code == 201) {
            navigate("/usuario/animais");
        } else {
            setErrosApi(response.data.errors);
        }
    }

    return (
        <>

            <h1>Denunciar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createAnimal'>

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

export default CreateDenuncia;
