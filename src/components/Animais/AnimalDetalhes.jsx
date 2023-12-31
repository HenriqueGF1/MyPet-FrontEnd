import { useState, useEffect, useContext, React } from "react";
import { Context } from "../../context/Context";
import { Link, useParams } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Loading from "../Loading/Loading";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import formatarNumeroTelefone from "../../helpers/formatarNumeroTelefone";
import formatarCEP from "../../helpers/formatarCEP";

function AnimalDetalhes({ animal, children }) {


    return (
        <>

            {/* <h1>Animal Detalhes</h1> */}

            {/* <NavBar /> */}

            {animal.length == 0 ? <Loading /> : (<>

                {animal.fotos.length < 1 ? 'Sem Fotos' : (<>
                    <p>
                        {animal.fotos?.map((foto) => {
                            return (
                                <img
                                    key={foto.nome_arquivo}
                                    src={`http://localhost:8000/${foto.url}`} alt={foto.nome_arquivo_original}
                                    width={'100px'}
                                />
                            )
                        })}
                    </p>

                </>)}

                <p><b>Nome:</b> {animal.nome}</p>
                <p><b>Sexo:</b> {animal.sexo}</p>
                <p><b>Idade:</b> {animal.idade} {animal.idade < 2 ? 'Ano' : 'Anos'}</p>
                <p><b>Categoria:</b> {animal.categoria.descricao}</p>
                <p><b>Porte:</b> {animal.porte.descricao}</p>
                <p><b>Descrição:</b> {animal.descricao}</p>

                <br />
                <h1>Dono</h1>
                <br />

                <p><b>ID:</b> {animal.usuario.id_usuario}</p>
                <p><b>Dono:</b> {animal.usuario.nome}</p>
                <p><b>E-mail:</b> {animal.usuario.email}</p>
                <p><b>Contatos:</b></p>
                <div>
                    {animal.usuario.contatos.map((contato) => (
                        contato.principal === 1 && (
                            <div key={contato.id_contato}>
                                {/* <p><b>Numero:</b> ({contato.dd}) {contato.numero}</p> */}
                                <p><b>Numero:</b> {formatarNumeroTelefone(contato.dd + contato.numero)}</p>
                            </div>
                        )
                    ))}
                </div>
                <p><b>Endereços:</b></p>
                <div>
                    {animal.usuario.enderecos.map((endereco) => (
                        endereco.principal === 1 && (
                            <div key={endereco.id_endereco}>
                                {/* <p><b>CEP:</b>{endereco.cep}</p> */}
                                <p><b>CEP:</b>{formatarCEP(endereco.cep)}</p>
                                <p><b>Bairro:</b>{endereco.bairro}</p>
                                <p><b>Numero:</b>{endereco.numero}</p>
                                <p><b>Complemento:</b>{endereco.complemento}</p>
                            </div>
                        )
                    ))}
                </div>
                <br />

                {children}

                <hr />

            </>)}
        </>
    )

}

AnimalDetalhes.propTypes = {
    animal: PropTypes.shape({
        id_animal: PropTypes.number.isRequired,
        nome: PropTypes.string.isRequired,
        descricao: PropTypes.string.isRequired,
        idade: PropTypes.number.isRequired,
        sexo: PropTypes.string.isRequired,
        dt_registro: PropTypes.string.isRequired,
        dt_inativacao: PropTypes.string,
        qtd_denuncia: PropTypes.number.isRequired,
        id_categoria: PropTypes.number.isRequired,
        id_porte: PropTypes.number.isRequired,
        id_usuario: PropTypes.number.isRequired,
        adotado: PropTypes.number.isRequired,
    }).isRequired,




    children: PropTypes.node,
};

export default AnimalDetalhes;
