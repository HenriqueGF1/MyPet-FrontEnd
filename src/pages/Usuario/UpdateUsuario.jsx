import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import { useParams } from 'react-router-dom';
import Loading from "../../components/Loading/Loading";
import MessageValidation from "../../components/Validation/MessageValidation";
import ErrosField from "../../components/Validation/errosField";
import { toast } from "react-toastify";

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

            toast.success('Editado com sucesso')

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
        }

        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })

    };

    return (
        <>
            <h1>Editar Usuário</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>
                <form onSubmit={handleSubmit(edit)}>

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

                    <br />
                    {
                        loadingApi ? <h1>Carregando...</h1> : (<>

                            <div className="form-group">
                                <button type="submit">Enviar</button>
                                <button type="reset">Cancelar</button>
                            </div>

                        </>)
                    }
                </form>
                <br />
                <br />
            </>)}


        </>
    );
}

export default UpdateUsuario;
