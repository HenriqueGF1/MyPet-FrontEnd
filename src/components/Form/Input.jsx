import { memo } from "react";

const Input = memo(
    function Input({
        label,
        typeInput,
        value,
        placeholder,
        name,
        register,
        validation,
        errors,
        apiErros
    }) {

        console.log("🚀 ~ file: Input.jsx:15 ~ name:", name)

        console.log("🚀 ~ file: Input.jsx:15 ~ apiErros:", apiErros)

        let inputName = name.replaceAll("[]", "");
        let erroMsg = '';

        if (Object.keys(errors).length > 0) {

            let erro = errors[inputName]?.type;

            switch (erro) {
                case 'required':
                    erroMsg = `Esse campo ${inputName} e obrigatório`
                    break;
                default:
                    break;
            }

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
                    value={value}
                />
                <br /><br />
                {
                    erroMsg != '' ? <><p>{erroMsg}</p><br /></> : <></>
                }
                {
                    apiErros != undefined ? <><p>{apiErros}</p><br /></> : <></>
                }
            </>
        )
    }
)

export default Input;
