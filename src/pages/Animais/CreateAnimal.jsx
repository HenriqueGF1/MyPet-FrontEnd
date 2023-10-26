import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Context } from "../../context/apiContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../../services/axiosInstance";
import Categoria from "../../components/Categorias/Categorias";
import Porte from "../../components/Porte/Porte";
import NavBar from "../../components/NavBar/NavBar";
import Input from "../../components/Form/Input";
import Select from "../../components/Form/Select";


function CreateAnimal() {

    let navigate = useNavigate();

    const [categorias, setCategorias] = useState([])
    const [porte, setPorte] = useState([])
    const [erros, setErros] = useState([])
    const { loading, setLoading } = useContext(Context)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    useEffect(() => {

        // setLoading(true);

        async function getCategorias() {
            await api
                .get("categoriasAnimal")
                .then(function (response) {
                    setCategorias(response.data.data);
                    setLoading(false);
                    reset()
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }

        async function getPorte() {
            await api
                .get("porteAnimais")
                .then(function (response) {
                    setPorte(response.data.data);
                    setLoading(false);
                    reset()
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }

        getCategorias();

        getPorte();

    }, []);

    const create = async (data) => {

        let animalData = new FormData(document.getElementById("createAnimal"));

        await api
            .post(`animais`,
                animalData
            )
            .then(function (response) {

                if (response.status == 201) {
                    navigate("/animais");
                } else {
                    setErros(response.data.errors);
                }

            })
            .catch(function (error) {
                console.log("🚀 ~ file: CreateAnimal.jsx:85 ~ create ~ error:", error)
                setErros(error.response.data.errors)
                // setLoading(false);
            });

        return
    }

    return (
        <>

            <h1>Criar Animal</h1>

            <NavBar />

            <form onSubmit={handleSubmit(create)} id='createAnimal'>

                <Input
                    label='Nome'
                    typeInput='text'
                    placeholder='Preencha seu nome'
                    name='nome'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <Input
                    label='Descrição'
                    typeInput='text'
                    placeholder='Preencha sua Descrição'
                    name='descricao'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <Input
                    label='Idade'
                    typeInput='date'
                    placeholder='Preencha sua Idade'
                    name='idade'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <Input
                    label='Sexo'
                    typeInput='text'
                    placeholder='Preencha seu Sexo'
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
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
                            apiErros={erros}
                        />

                        <Select
                            label='Porte'
                            name='id_porte'
                            register={register}
                            arrayValues={porte}
                            valueId='id_porte'
                            valueText='descricao'
                            apiErros={erros}
                        />

                    </>
                )}

                <Input
                    label='Imagens'
                    typeInput='file'
                    name='imagens[]'
                    register={register}
                    validation={{ required: true }}
                    errors={errors}
                    apiErros={erros}
                />

                <br />

                <button type="submit">Enviar</button>
            </form>

            <br /><br />

        </>
    );
}

export default CreateAnimal;
