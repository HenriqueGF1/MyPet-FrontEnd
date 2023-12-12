import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../../components/Loading/Loading";

function UpdateDenunciaTipo() {

    let navigate = useNavigate();

    let { id_tipo } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`admin/denunciasTipos/${id_tipo}`, "get")
            return {
                id_tipo: response.data.id_tipo,
                descricao: response.data.descricao
            }
        }
    });

    const edit = async (data) => {

        let response = await apiFetch(`admin/denuncias/tipos/${data.id_tipo}`, "patch", data)

        if (response.code == 200) {
            toast.success('Editado com Sucesso !!')
            navigate("/admin/denuncias/tipos");
        } else {
            setErrosApi(response.data.errors);
            // toast.warning('Atenção');
        }

    };

    return (
        <>
            <h1>Editar Tipo de Denuncia</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>

                <form onSubmit={handleSubmit(edit)} id="editPorte">

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

                    <br />

                    <button type="submit">Enviar</button>
                </form>

                <br />
            </>)}

        </>
    );
}

export default UpdateDenunciaTipo;
