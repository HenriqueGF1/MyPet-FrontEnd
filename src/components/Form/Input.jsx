function Input({ label, typeInput, placeholder, name, register, validation, errors, apiErros }) {

    console.log("Input")

    let inputName = name.replaceAll("[]", "");

    let erroApiMsg = '';
    let erroMsg = '';

    if (apiErros != undefined) {
        erroApiMsg = apiErros[inputName]
    }


    if (Object.keys(errors).length > 0) {

        console.log("🚀 ~ file: Input.jsx:2 ~ Input ~ errors:", errors)

        let erro = errors[inputName].type;

        switch (erro) {
            case 'required':
                erroMsg = `Esse campo ${inputName} e obrigatório`
                break;
            default:
                break;
        }
        console.log("🚀 ~ file: Input.jsx:23 ~ Input ~ erroMsg:", erroMsg)
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
            />
            <br />
            {
                erroApiMsg != '' ? <p>{erroApiMsg}</p> : <></>
            }
            {
                erroMsg != '' ? <p>{erroMsg}</p> : <></>
            }
            <br />
        </>
    )
}

export default Input;
