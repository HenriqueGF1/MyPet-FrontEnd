import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import { useParams } from 'react-router-dom';
import Loading from "../../components/Loading/Loading";

function UpdateUsuario() {

    let navigate = useNavigate();

    let { id_usuario } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`usuarios/${id_usuario}`, "get")
            return {
                id_usuario: response.data.id_usuario,
                nome: response.data.nome
            }
        }
    });

    const edit = async (data) => {

        let response = await apiFetch(`usuarios/${data.id_usuario}`, "patch", data)

        if (response.code == 200) {

            const user = JSON.parse(localStorage.getItem("user"))

            localStorage.removeItem("user");

            localStorage.setItem(
                "user",
                JSON.stringify({
                    id_usuario: user.id_usuario,
                    nome: data.nome,
                    id_perfil: user.id_perfil,
                })
            );

            navigate("/home");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    return (
        <>
            <h1>Editar Usuário</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>
                <form onSubmit={handleSubmit(edit)}>

                    <Input
                        label='Nome'
                        typeInput='text'
                        placeholder='Preencha seu Nome'
                        name='nome'
                        register={register}
                        validation={{ required: true }}
                        errors={errors}
                        apiErros={errosApi.nome}
                    />

                    <br />
                    <button type="submit">Enviar</button>
                </form>
                <br />
                <br />
            </>)}


        </>
    );
}

export default UpdateUsuario;
