import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/Context";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import MessageValidation from "../../../components/Validation/MessageValidation";
import ErrosField from "../../../components/Validation/errosField";
import { toast } from "react-toastify";

function CreateDenunciaTipo() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        let response = await apiFetch(`/admin/denuncias/tipos`, "post", data)

        if (response.code == 201) {
            toast.success('Cadastrado com sucesso')
            navigate("/admin/denuncias/tipos");
            return
        }

        setErrosApi({
            "code": response.code,
            "erro": response.data.errors,
        })
    }
    return (
        <>

            <h1>Criar Porte</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createTipoDenuncia'>

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

            <br /><br />

        </>
    );
}

export default CreateDenunciaTipo;
