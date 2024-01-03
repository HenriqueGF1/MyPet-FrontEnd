import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import Select from "../Form/Select";
import PropTypes from 'prop-types';

function Categorias({
    label,
    name,
    valorDefinido,
    register,
    erros
}) {

    const [categorias, setCategorias] = useState([])
    const { loadingApi, apiFetch } = useContext(Context);
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
                    <div className="form-group">
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
                    </div>
            }
        </>
    )
}

Categorias.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    register: PropTypes.func.isRequired,
    erros: PropTypes.object,
};

export default Categorias;