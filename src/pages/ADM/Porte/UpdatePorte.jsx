import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../../components/Loading/Loading";
import MessageValidation from "../../../components/Validation/MessageValidation";
import ErrosField from "../../../components/Validation/errosField";

function UpdatePorte() {

    let navigate = useNavigate();

    let { id_porte } = useParams();
    const [errosApi, setErrosApi] = useState([]);
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: async () => {
            let response = await apiFetch(`admin/porteAnimais/${id_porte}`, "get")
            return {
                id_porte: response.data.id_porte,
                descricao: response.data.descricao
            }
        }
    });

    const edit = async (data) => {

        let response = await apiFetch(`admin/porteAnimais/${data.id_porte}`, "patch", data)

        if (response.code == 200) {
            toast.success('Editado com sucesso')
            navigate("/admin/portes");
            return
        }

        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })

    };

    return (
        <>
            <h1>Editar Porte</h1>

            <NavBar />

            {loadingApi ? (
                <Loading />
            ) : (<>

                <form onSubmit={handleSubmit(edit)} id="editPorte">

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

export default UpdatePorte;
