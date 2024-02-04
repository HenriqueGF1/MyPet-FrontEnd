import ErrosField from "../Validation/errosField";
import MessageValidation from "../Validation/MessageValidation";
import PropTypes from "prop-types";

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
  onChange,
}) {
  return (
    <>
      <label className="label-padrao">{label}</label>
      <select
        value={valorDefinido}
        name={name}
        {...register(name, validation)}
        onChange={onChange}
        className="input-padrao"
      >
        {arrayValues?.map((arrayValue) => {
          return (
            <option key={arrayValue[valueId]} value={arrayValue[valueId]}>
              {arrayValue[valueText]}
            </option>
          );
        })}
      </select>
      {[apiErros].erro?.[name] && (
        <ErrosField errosApi={apiErros} field={name} />
      )}
      {errors != undefined
        ? errors[name != undefined ? name : ""]
        : "" &&
          MessageValidation(
            label,
            errors != undefined
              ? errors[name != undefined ? name : ""]
              : ""?.type
          )}
    </>
  );
}

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  arrayValues: PropTypes.array,
  valueId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  valueText: PropTypes.string,
  validation: PropTypes.object,
  errors: PropTypes.object,
  apiErros: PropTypes.array,
  valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
};

export default Select;
