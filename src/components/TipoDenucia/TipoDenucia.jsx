import PropTypes from "prop-types";
import Select from "../Form/Select";
import { Context } from "../../context/Context";
import { useState, useContext, useEffect } from "react";

function TipoDenucia({ label, name, valorDefinido, register, erros }) {
  const [tipos, setTipos] = useState([]);
  const { loadingApi, apiFetch } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      let response = await apiFetch(`denuncias/tipos`, "get");
      setTipos(response.data);
    };

    getData();
  }, []);

  return (
    <>
      {loadingApi || tipos.length == 0 ? (
        <div className="w-[100%] font-semibold my-5 flex justify-center items-center">
          <h1>Carregando...</h1>
        </div>
      ) : (
        <Select
          label={label}
          name={name}
          register={register}
          arrayValues={tipos}
          valueId="id_tipo"
          valueText="descricao"
          apiErros={erros}
          valorDefinido={valorDefinido}
        />
      )}
    </>
  );
}

TipoDenucia.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  valorDefinido: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  register: PropTypes.func.isRequired,
  erros: PropTypes.object,
};

export default TipoDenucia;
