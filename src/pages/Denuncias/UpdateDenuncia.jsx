import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { useParams } from 'react-router-dom';
import TipoDenucia from "../../components/TipoDenucia/Categorias";
import { toast } from 'react-toastify';
import Loading from "../../components/Loading/Loading";

function UpdateDenuncia() {

    let navigate = useNavigate();

    let { id_denuncia } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`animais/denuncias/${id_denuncia}`, "get")
            return {
                id_denuncia: response.data.id_denuncia,
                descricao: response.data.descricao,
                id_tipo: response.data.id_tipo,
            }
        }
    });

    const edit = async (data) => {

        console.log("🚀 ~ file: UpdateAnimais.jsx:39 ~ edit ~ data:", data)

        let response = await apiFetch(`animais/denuncias/${data.id_denuncia}`, "patch", data)

        console.log("🚀 ~ file: UpdateDenuncia.jsx:43 ~ edit ~ response:", response)

        if (response.code == 200) {
            toast.success("Editado com Sucesso !!");
            navigate("/minhas/denuncias");
        } else {
            setErrosApi(response.data.errors);
        }

    };

    return (
        <>
            <h1>Editar Animal</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>
                <form onSubmit={handleSubmit(edit)} id="editAnimal">

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

                <br />
                <br />
            </>)}
        </>
    );
}

export default UpdateDenuncia;
