import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import formatarCEP from "../../helpers/formatarCEP";

function ContatosList({
    id_endereco,
    cep,
    bairro,
    numero,
    complemento,
    principal,
    handlePrincipal,
    handleDelete
}) {

    return (
        <div className="bg-[#ffffff] w-[100%] rounded shadow-lg m-3 flex flex-col lg:flex-row justify-between p-5">

            <div className="w-[100%] lg:w-[50%] flex flex-col lg:flex-row">
                <div className="p-3">
                    <p className="text-sm">{formatarCEP(cep)}</p>
                    <p className="text-sm">{bairro}</p>
                    <p className="text-sm">{numero}</p>
                    <p className="text-sm">{complemento}</p>
                    <p className="text-sm">Principal: {principal == 1 ? 'Sim' : 'Não'}</p>
                </div>
            </div>

            <div className="w-[100%] lg:w-[50%] flex flex-row lg:flex-col flex-wrap lg:flex-nowrap items-start lg:items-end">

                <Link
                    className="botao m-1 text-white bg-[--color-principal] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                    to={`/enderecos/editar/${id_endereco}`}>Editar</Link>

                {principal == 0 ? <button
                    onClick={() => handlePrincipal(id_endereco)}
                    className="botao m-1 text-white bg-[--color-secundaria] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                    type="submit"
                >Colocar Como Principal</button> : ""}

                {principal == 0 ? <button
                    onClick={() => handleDelete(id_endereco)}
                    className="botao m-1 text-white bg-[--color-terciario] hover:bg-[--color-secundaria] hover:text-white w-[45%]"
                    type="submit"
                >Excluir</button> : ""}

            </div>

        </div>
    )
}

ContatosList.propTypes = {
    id_endereco: PropTypes.number.isRequired,
    cep: PropTypes.string.isRequired,
    bairro: PropTypes.string.isRequired,
    numero: PropTypes.number.isRequired,
    complemento: PropTypes.string,
    principal: PropTypes.number.isRequired,
    handlePrincipal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default ContatosList;
