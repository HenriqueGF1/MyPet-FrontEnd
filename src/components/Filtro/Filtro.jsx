import React from 'react';
import PropTypes from 'prop-types';

const Filtro = ({ combo, id_combo, handleFiltro, comboOpcaoSelecionada }) => {
    return (
        <div>
            {
                combo.map((item) => (
                    <button
                        id={item[id_combo]}
                        onClick={() => handleFiltro(item[id_combo])}
                        className={`mr-1 botao ${comboOpcaoSelecionada?.includes(item[id_combo]) ? "bg-[--color-principal] text-white" : "bg-[--color-02]"}`}
                        key={`filters-${item[id_combo]}`}
                    >
                        {item.descricao}
                    </button>
                ))
            }
        </div>
    );
};

Filtro.propTypes = {
    combo: PropTypes.array.isRequired,
    id_combo: PropTypes.string.isRequired,
    handleFiltro: PropTypes.func.isRequired,
    comboOpcaoSelecionada: PropTypes.array,
};

export default Filtro;
