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

    const [erros, setErros] = useState([])
    const [animal, setAnimal] = useState({})
    const [categorias, setCategorias] = useState();
    const { loading, setLoading } = useContext(Context);
    let navigate = useNavigate();

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

        async function getData() {

            await api
                .get("animais/37")
                .then(function (response) {
                    // setLoading(false);
                    reset();
                    setAnimal(response.data.data);
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }

        getData();

        async function getDataCa() {
            await api
                .get("categoriasAnimal")
                .then(function (response) {
                    setCategorias(response.data.data);
                    setLoading(false);
                })
                .catch(function (error) {
                    setErros(error);
                    setLoading(false);
                });
        }

        getDataCa();

    }, []);

    const edit = async (data) => {

        console.log("🚀 ~ file: EditAnimais.jsx:31 ~ edit ~ data:", data)

        // return

        await api
            .patch(`animais/${animal.id_animal}`,
                data
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

    const handleChange = event => {
        console.log('Label 👉️', event.target.selectedOptions[0].label);
        console.log(event.target.value);
    };

    return (
        <>

            <h1>Editar Animal</h1>

            <NavBar />

            {loading ? <h1>Carregando****</h1> : (

                <form onSubmit={handleSubmit(edit)}>

                    <Input
                        label='Nome'
                        typeInput='text'
                        placeholder='Preencha seu nome'
                        name='nome'
                        register={register}
                        validation={{ required: true }}
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

                    {loading ? <h1>Carregando****</h1> : (

                        // <Categoria
                        //     label="Categoria"
                        //     register={register("id_categoria", { value: 1 })}
                        //     name="id_categoria"
                        //     erros={erros}
                        // />

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
                    )}

                    <br /><br />
                    <button type="submit">Enviar</button>
                </form>

            )}

        </>
    );
}

export default UpdateAnimais;
