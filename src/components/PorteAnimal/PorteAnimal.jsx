import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/apiContext";
import Select from "../Form/Select";

function PorteAnimal({ label, name, valorDefinido, register, erros }) {

    const [porteAnimal, setPorteAnimal] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);  

    console.log("PorteAnimal")

    useEffect(() => {

        const getData = async () => {
            let response = await apiFetch(`porteAnimais`, "get")
            setPorteAnimal(response.data);
        }

        getData()

    }, []);

    return (
        <>
            {
                loadingApi || porteAnimal.length == 0 ? <h1>Carregando...</h1> :
                    <Select
                        label={label}
                        name={name}
                        register={register}
                        arrayValues={porteAnimal}
                        valueId='id_porte'
                        valueText='descricao'
                        apiErros={erros}
                        valorDefinido={valorDefinido}
                    />
            }
            <br />
        </>
    )
}

export default PorteAnimal;