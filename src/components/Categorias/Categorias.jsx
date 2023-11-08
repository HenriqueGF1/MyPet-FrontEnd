import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/apiContext";
import Select from "../Form/Select";

function Categorias({ label, name, valorDefinido, register, erros }) {

    const [categorias, setCategorias] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);
    console.log("Categorias")
    useEffect(() => {

        const getData = async () => {
            let response = await apiFetch(`categoriasAnimal/`, "get")
            setCategorias(response.data);
        }

        getData()

    }, []);

    return (
        <>
            {
                loadingApi || categorias.length == 0 ? <h1>Carregando...</h1> :
                    <Select
                        label={label}
                        name={name}
                        register={register}
                        arrayValues={categorias}
                        valueId='id_categoria'
                        valueText='descricao'
                        apiErros={erros}
                        valorDefinido={valorDefinido}
                    />
            }
            <br />
        </>
    )
}

export default Categorias;