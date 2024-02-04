import PropTypes from "prop-types";

function RespostaDenuncia({ respostaDenuncia }) {
  return (
    <>
      {respostaDenuncia.map((item) => {
        return (
          <div
            key={item.id_resposta}
            className={`p-3 my-5 w-[100%] flex flex-col justify-start align-center ${
              item.aceite == 1 ? "border-l-8 border-[--color-06]" : ""
            }`}
          >
            <div className="my-2">
              <p className="text-sm my-1 mr-1">
                <b>Denúncia: </b>
                {item.descricao}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Data Denúncia: </b>
                {item.dt_registro}
              </p>
            </div>

            <div className="my-2">
              <p className="text-sm my-1 mr-1">
                <b>Data Resposta: </b>
                {item.dt_resposta}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Resposta do Administrador: </b>
                {item.resposta}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

RespostaDenuncia.propTypes = {
  respostaDenuncia: PropTypes.arrayOf(
    PropTypes.shape({
      id_resposta: PropTypes.number.isRequired,
      aceite: PropTypes.number.isRequired,
      descricao: PropTypes.string.isRequired,
      dt_resposta: PropTypes.string.isRequired,
      resposta: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RespostaDenuncia;
