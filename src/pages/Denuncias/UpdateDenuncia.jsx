import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Categorias from "../../components/Categorias/Categorias";
import PorteAnimal from "../../components/PorteAnimal/PorteAnimal";
import { useParams } from 'react-router-dom';
import TipoDenucia from "../../components/TipoDenucia/TipoDenucia";
import { toast } from 'react-toastify';
import Loading from "../../components/Loading/Loading";
import MessageValidation from "../../components/Validation/MessageValidation";
import ErrosField from "../../components/Validation/errosField";

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

        let response = await apiFetch(`animais/denuncias/${data.id_denuncia}`, "patch", data)

        if (response.code == 200) {
            toast.success("Editado com Sucesso !!");
            navigate("/minhas/denuncias");
        } else {
            setErrosApi({
                "code": response.code,
                "erro": response.data.errors,
            })
        }

    };

    return (
        <>
            <h1>Editar Denuncia</h1>

            <NavBar />

            <form onSubmit={handleSubmit(edit)} id="editAnimal">

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

            <br />
            <br />

        </>
    );
}

export default UpdateDenuncia;
