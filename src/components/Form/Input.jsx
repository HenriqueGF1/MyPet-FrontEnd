function Input({ label, typeInput, placeholder, name, register, value, validation, errors, onChange, apiErros }) {

    let inputName = name.replaceAll("[]", "");

    let erro = errors[inputName] != undefined ? errors[inputName].type : undefined;
    let msgErro = '';

    switch (erro) {
        case 'required':
            msgErro = `Esse campo ${inputName} e obrigatório`
            break;
        default:
            break;
    }

    return (
        <>
            <label>{label}</label>
            <br />
            <input
                type={typeInput}
                placeholder={placeholder}
                name={name}
                {...register(name, validation)}
                defaultValue={value}
                onChange={onChange}
            />
            <br />
            {
                msgErro != '' ? <p>{msgErro}</p> : <></>
            }
            {
                apiErros != '' ? <p>{apiErros[name]}</p> : <></>
            }
            <br />
        </>
    )
}

export default Input;