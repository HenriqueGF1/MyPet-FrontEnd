import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import api from "../../services/axiosInstance";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";

function UpdateAnimais() {
    let navigate = useNavigate();

    const [animal, setAnimal] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [porte, setPorte] = useState([]);
    const [errosApi, setErrosApi] = useState([]);
    const { loading, setLoading } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: async () =>
            await api
                .get("animais/52")
                .then(function (response) {
                    // console.log("🚀 ~ file: UpdateAnimais.jsx:43 ~ response:", response);
                    // setAnimal(response.data.data);
                    // reset(animal);

                    // reset();
                    return {
                        id_animal: response.data.data.id_animal,
                        nome: response.data.data.nome,
                        descricao: response.data.data.descricao,
                        idade: response.data.data.idade,
                        sexo: response.data.data.sexo,
                        id_categoria: response.data.data.id_categoria,
                        id_porte: response.data.data.id_porte,
                    }

                })
                .catch(function (error) {
                    setErrosApi(error);
                })
    });

    useEffect(() => {
        // setLoading(true);

        async function getCategorias() {
            await api
                .get("categoriasAnimal")
                .then(function (response) {
                    setCategorias(response.data.data);
                })
                .catch(function (error) {
                    setErrosApi(error);
                });
        }

        async function getPorte() {
            await api
                .get("porteAnimais")
                .then(function (response) {
                    setPorte(response.data.data);
                })
                .catch(function (error) {
                    setErrosApi(error);
                });
        }

        getCategorias();

        getPorte();

    }, []);

    const edit = async (data) => {

        console.log("🚀 ~ file: UpdateAnimais.jsx:91 ~ edit ~ data:", data)

        await api
            .patch(`animais/${data.id_animal}`, data)
            .then(function (response) {
                console.log("🚀 ~ file: UpdateAnimais.jsx:78 ~ response:", response);
                // if (response.status == 200) {
                //     navigate("/animais");
                // } else {
                //     setErros(response.data.errors);
                // }
            })
            .catch(function (error) {
                console.log("🚀 ~ file: UpdateAnimais.jsx:100 ~ edit ~ error:", error.response.data)
                setErrosApi(error.response.data)
            });

        return;
    };

    console.log("Editar")

    return (
        <>
            <h1>Editar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(edit)} id="editAnimal">

                <Input
                    label='Nome'
                    typeInput='text'
                    placeholder='Preencha seu nome'
                    name='nome'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.errors}
                />

                <Input
                    label='Descrição'
                    typeInput='text'
                    placeholder='Preencha sua Descrição'
                    name='descricao'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.errors}
                />

                <Input
                    label='Idade'
                    typeInput='date'
                    placeholder='Preencha sua Idade'
                    name='idade'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.errors}
                />

                <Input
                    label='Sexo'
                    typeInput='text'
                    placeholder='Preencha seu Sexo'
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={errosApi.errors}
                />

                {loading ? <h1>Carregando****</h1> : (

                    <>
                        <Select
                            label='Categoria'
                            name='id_categoria'
                            register={register}
                            arrayValues={categorias}
                            valueId='id_categoria'
                            valueText='descricao'
                            valorDefinido={animal.id_categoria}
                            apiErros={errosApi.errors}
                        />

                        <Select
                            label='Porte'
                            name='id_porte'
                            register={register}
                            arrayValues={porte}
                            valueId='id_porte'
                            valueText='descricao'
                            valorDefinido={animal.id_porte}
                            apiErros={errosApi.errors}
                        />
                    </>


                )}

                {/* <Input
                    label='Imagens'
                    typeInput='file'
                    name='imagens[]'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                /> */}

                <br />
                <button type="submit">Enviar</button>
            </form>

            <br />
            <br />
        </>
    );
}

export default UpdateAnimais;
