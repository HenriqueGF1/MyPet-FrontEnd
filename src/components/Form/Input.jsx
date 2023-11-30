import { memo } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

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

Input.propTypes = {
    label: PropTypes.string.isRequired,
    typeInput: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    name: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    validation: PropTypes.object,
    errors: PropTypes.object,
    apiErros: PropTypes.array,
    onChange: PropTypes.func,
    id: PropTypes.string,
};

export default Input;
