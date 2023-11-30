import { memo } from "react";
import { toast } from 'react-toastify';

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
        apiErros,
        onChange,
        id
    }) {

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

        if (apiErros != undefined || erroMsg != '') {

            toast.warning('Atenção');
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
                    onChange={onChange}
                    id={id}
                    accept="image/*" multiple
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
