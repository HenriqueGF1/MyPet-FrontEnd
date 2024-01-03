import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import Select from "../Form/Select";
import PropTypes from 'prop-types';

function PorteAnimal({
    label,
    name,
    valorDefinido,
    register,
    errors,
    errosApi,
}) {

    const [porteAnimal, setPorteAnimal] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);

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
                    <div className="form-group">
                        <Select
                            label={label}
                            name={name}
                            register={register}
                            arrayValues={porteAnimal}
                            valueId='id_porte'
                            valueText='descricao'
                            errors={errors}
                            apiErros={errosApi}
                            valorDefinido={valorDefinido}
                        />
                    </div>
            }
        </>
    )
}

PorteAnimal.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
    errosApi: PropTypes.object,
};

export default PorteAnimal;