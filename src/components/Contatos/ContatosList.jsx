import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import formatarNumeroTelefone from '../../helpers/formatarNumeroTelefone'

function ContatosList({
    id_contato,
    dd,
    numero,
    principal,
    handlePrincipal,
    handleDelete
}) {

    return (

        <div className={`bg-[#ffffff] w-[100%] shadow-lg m-3 p-5 ${principal ? 'border-l-8 border-[--color-principal]' : ''}
        w-[90%] p-3 my-3 mx-auto shadow-md`}>


            <div className="w-[100%] lg:w-[50%] flex flex-col lg:flex-row">
                <div className="p-3">
                    <p className="text-sm my-1 mr-1"><b>Número Telefone: </b>{formatarNumeroTelefone(dd + numero)}</p>
                    {/* <p className="text-sm my-1 mr-1">Principal: {principal == 1 ? 'Sim' : 'Não'}</p> */}
                </div>
            </div>

            <Link
                to={`/contatos/editar/${id_contato}`}
                className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
                type="submit"
            >Editar</Link>

            {principal == 0 ?

                <>
                    <button
                        onClick={() => handlePrincipal(id_contato)}
                        className="botao btn-group text-black bg-[--color-07] hover:bg-[--color-02]"
                        type="submit"
                    >Colocar Como Principal</button>

                    <button
                        onClick={() => handleDelete(id_contato)}
                        className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black"
                        type="submit"
                    >Excluir</button>
                </>
                : ""}

        </div>
    )

}

ContatosList.propTypes = {
    id_contato: PropTypes.number.isRequired,
    dd: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    principal: PropTypes.number.isRequired,
    handlePrincipal: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
};

export default ContatosList;
