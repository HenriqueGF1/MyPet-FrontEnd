import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import Select from "../Form/Select";
import PropTypes from 'prop-types';

function TipoDenucia({
    label,
    name,
    valorDefinido,
    register,
    erros
}) {

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
                    <div className="form-group">
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
                    </div>
            }
            <br />
        </>
    )
}

TipoDenucia.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    register: PropTypes.func.isRequired,
    erros: PropTypes.object,
};

export default TipoDenucia;