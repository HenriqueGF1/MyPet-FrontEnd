function Select({ label, name, register, arrayValues, valueId, valueText, validation, errors, apiErros, valorDefinido, onChange }) {

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
                apiErros != '' ? <p>{apiErros[name]}</p> : <></>
            }
            <br />
        </>
    )
}

export default Select;