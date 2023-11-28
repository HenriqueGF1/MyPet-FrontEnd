import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../../context/apiContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../components/NavBar/NavBar";
import Input from "../../../components/Form/Input";

function CreatePorte() {

    let navigate = useNavigate();

    const [errosApi, setErrosApi] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {

        console.log("🚀 ~ file: CreatePorte.jsx:22 ~ create ~ data:", data)

        let response = await apiFetch(`/admin/porteAnimais`, "post", data)

        console.log("🚀 ~ file: CreatePorte.jsx:27 ~ create ~ response:", response)

        if (response.code == 201) {
            navigate("/admin/portes");
        } else {
            alert(response.data.message)
            setErrosApi(response.data.errors);
        }
    }
    return (
        <>

            <h1>Criar Porte</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createPorte'>

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

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

export default CreatePorte;
