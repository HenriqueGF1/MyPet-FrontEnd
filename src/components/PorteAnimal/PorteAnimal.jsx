import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/Context";
import Select from "../Form/Select";
import PropTypes from "prop-types";

function PorteAnimal({
  label,
  name,
  valorDefinido,
  register,
  errors,
  errosApi,
}) {
  const [porteAnimal, setPorteAnimal] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      let response = await apiFetch(`porteAnimais`, "get");
      setPorteAnimal(response.data);
    };

    getData();
  }, []);

  return (
    <>
      {loadingApi || porteAnimal.length == 0 ? (
        <div className="w-[100%] font-semibold my-5 flex justify-center items-center">
          <h1>Carregando...</h1>
        </div>
      ) : (
        <Select
          label={label}
          name={name}
          register={register}
          arrayValues={porteAnimal}
          valueId="id_porte"
          valueText="descricao"
          errors={errors}
          apiErros={errosApi}
          valorDefinido={valorDefinido}
        />
      )}
    </>
  );
}

PorteAnimal.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  register: PropTypes.func.isRequired,
  errors: PropTypes.object,
  errosApi: PropTypes.object,
};

export default PorteAnimal;
