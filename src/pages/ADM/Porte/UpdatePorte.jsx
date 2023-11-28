import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loading from "../../../components/Loading/Loading";

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
            console.log("🚀 ~ file: UpdatePorte.jsx:27 ~ defaultValues: ~ response:", response)
            return {
                id_porte: response.data.id_porte,
                descricao: response.data.descricao
            }
        }
    });

    const edit = async (data) => {

        console.log("🚀 ~ file: UpdatePorte.jsx:35 ~ edit ~ data:", data)

        let response = await apiFetch(`admin/porteAnimais/${data.id_porte}`, "patch", data)

        console.log("🚀 ~ file: UpdatePorte.jsx:40 ~ edit ~ response:", response)

        if (response.code == 200) {
            toast.success('Editado com Sucesso !!')
            navigate("/admin/portes");
        } else {
            console.log('sssssssssssss')
            setErrosApi(response.data.errors);
            // toast.warning('Atenção');
        }

    };

    return (
        <>
            <h1>Editar Porte</h1>

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

export default UpdatePorte;
