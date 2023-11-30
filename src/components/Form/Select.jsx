import PropTypes from 'prop-types';

function Select({
    label,
    name,
    register,
    arrayValues,
    valueId,
    valueText,
    validation,
    errors,
    apiErros,
    valorDefinido,
    onChange
}) {


    return (
        <>
            <label>{label}</label>
            <br />
            <select value={valorDefinido} name={name} {...register(name, validation)}
                onChange={onChange}
            >
                {arrayValues?.map((arrayValue) => {
                    return (
                        <option
                            key={arrayValue[valueId]}
                            value={arrayValue[valueId]}
                        >
                            {arrayValue[valueText]}
                        </option>
                    )
                })}
            </select>
            <br />
            {
                // apiErros != '' ? <p>{apiErros[name]}</p> : <></>
            }
            <br />
        </>
    )
}

Select.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    arrayValues: PropTypes.array.isRequired,
    valueId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueText: PropTypes.string,
    validation: PropTypes.object,
    errors: PropTypes.object,
    apiErros: PropTypes.array,
    valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onChange: PropTypes.func,
};

export default Select;