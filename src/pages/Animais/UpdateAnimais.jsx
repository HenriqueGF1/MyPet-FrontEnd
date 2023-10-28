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


function UpdateAnimais() {

    let navigate = useNavigate();

    const [animal, setAnimal] = useState({})
    const [categorias, setCategorias] = useState([])
    const [porte, setPorte] = useState([])
    const [erros, setErros] = useState([])
    const { loading, setLoading } = useContext(Context);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: animal
    });

    useEffect(() => {

        // setLoading(true);

        async function getAnimal() {

            await api
                .get("animais/37")
                .then(function (response) {
                    setAnimal(response.data.data);
                    setLoading(false);
                    reset();
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }

        getAnimal();

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

    const edit = async (data) => {

        let animalData = new FormData(document.getElementById("editAnimal"));
        animalData.append('_method', 'PATCH');

        await api
            .post(`animais/${animal.id_animal}`,
                animalData,
            )
            .then(function (response) {
                console.log("🚀 ~ file: UpdateAnimais.jsx:78 ~ response:", response)
                if (response.status == 200) {
                    navigate("/animais");
                } else {
                    setErros(response.data.errors);
                }

            })
            .catch(function (error) {
                console.log("🚀 ~ file: UpdateAnimais.jsx:90 ~ edit ~ error:", error)
                setErros(error.response.data.errors)
                // setLoading(false);
            });

        return
    }

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
                    validation={{ required: false }}
                    value={animal.nome}
                    errors={errors}
                    onChange={e => setAnimal({
                        ...animal,
                        nome: e.target.value
                    })}
                    apiErros={erros}
                />

                <Input
                    label='Descrição'
                    typeInput='text'
                    placeholder='Preencha sua Descrição'
                    name='descricao'
                    register={register}
                    validation={{ required: true }}
                    value={animal.descricao}
                    errors={errors}
                    onChange={e => setAnimal({
                        ...animal,
                        descricao: e.target.value
                    })}
                    apiErros={erros}
                />

                <Input
                    label='Idade'
                    typeInput='date'
                    placeholder='Preencha sua Idade'
                    name='idade'
                    register={register}
                    validation={{ required: false }}
                    // value={animal.idade}
                    value='2000-07-12'
                    errors={errors}
                    onChange={e => setAnimal({
                        ...animal,
                        idade: e.target.value
                    })}
                    apiErros={erros}
                />

                <Input
                    label='Sexo'
                    typeInput='text'
                    placeholder='Preencha seu Sexo'
                    name='sexo'
                    register={register}
                    validation={{ required: true }}
                    value={animal.sexo}
                    errors={errors}
                    onChange={e => setAnimal({
                        ...animal,
                        sexo: e.target.value
                    })}
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
                            valorDefinido={animal.id_categoria}
                            apiErros={erros}
                            onChange={e => setAnimal({
                                ...animal,
                                id_categoria: e.target.value
                            })}
                        />

                        <Select
                            label='Porte'
                            name='id_porte'
                            register={register}
                            arrayValues={porte}
                            valueId='id_porte'
                            valueText='descricao'
                            valorDefinido={animal.id_porte}
                            apiErros={erros}
                            onChange={e => setAnimal({
                                ...animal,
                                id_porte: e.target.value
                            })}
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

            <br /><br />
        </>
    );
}

export default UpdateAnimais;
