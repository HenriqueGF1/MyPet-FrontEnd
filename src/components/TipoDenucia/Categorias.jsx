import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/apiContext";
import Select from "../Form/Select";

function TipoDenucia({ label, name, valorDefinido, register, erros }) {

    const [tipos, setTipos] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);
    
    useEffect(() => {

        const getData = async () => {
            let response = await apiFetch(`admin/denuncias/tipos`, "get")
            setTipos(response.data);
        }

        getData()

    }, []);

    return (
        <>
            {
                loadingApi || tipos.length == 0 ? <h1>Carregando...</h1> :
                    <Select
                        label={label}
                        name={name}
                        register={register}
                        arrayValues={tipos}
                        valueId='id_tipo'
                        valueText='descricao'
                        apiErros={erros}
                        valorDefinido={valorDefinido}
                    />
            }
            <br />
        </>
    )
}

export default TipoDenucia;