import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../../components/Loading/Loading";
import ErrosField from "../../../components/Validation/errosField";
import MessageValidation from "../../../components/Validation/MessageValidation";

function UpdateCategoria() {

    let navigate = useNavigate();

    let { id_categoria } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`admin/categoriasAnimal/${id_categoria}`, "get")
            return {
                id_categoria: response.data.id_categoria,
                descricao: response.data.descricao
            }
        }
    });

    const edit = async (data) => {

        let response = await apiFetch(`admin/categoriasAnimal/${data.id_categoria}`, "patch", data)

        if (response.code == 200) {
            toast.success('Editado com sucesso')
            navigate("/admin/categorias");
            return
        }

        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })
    };

    return (
        <>
            <h1>Editar Categoria</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>

                <form onSubmit={handleSubmit(edit)} id="editCategoria">

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
            </>)}

        </>
    );
}

export default UpdateCategoria;
