// import { Link } from "react-router-dom";

// function AdmDenunciasList({
//     id_denuncia,
//     descricao,
//     dt_registro,
//     dt_inativacao,
//     dt_exclusao
// }) {
//     return (
//         <>
//             <ul >
//                 <li>{dt_inativacao ? 'DESATIVADO' : ''}</li>
//                 <li><b>Descrição:</b> {descricao}</li>
//                 <li><b>Data Registro:</b> {dt_registro}</li>
//                 <li><b>Data Inativação:</b> {dt_inativacao}</li>
//                 <li><b>Data Exclusão:</b> {dt_exclusao}</li>
//                 <br />
//                 {dt_exclusao ? "" : (<>
//                     <li>
//                         {dt_inativacao ? "" : <Link to={`/admin/denuncias/responder/${id_denuncia}`}>RESPONDER: - {id_denuncia}</Link>}
//                     </li>
//                     {/* <li>
//                         {dt_inativacao ? "" : <ul><li onClick={() => handleDelete(id_denuncia)}>VER DETALHES: - {id_denuncia}</li></ul>}
//                     </li> */}
//                     <br />
//                 </>)}
//                 <br />
//             </ul>
//         </>
//     )
// }


// export default AdmDenunciasList

import { useState, useEffect, useContext, React } from "react";
import { Context } from "../../../context/Context";
import { Link, useParams } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";
import Loading from "../../Loading/Loading";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';


function DenunciaDetalhes({ denuncia, usuario, usuarioDenunciante, animal, children }) {

    return (
        <>

            {denuncia.length == 0 || usuario.length == 0 || usuarioDenunciante.length == 0 || animal.length == 0 ? <Loading /> : (<div>


                <h1>Denuncia</h1>

                <p>Tipo: {denuncia.tipo.descricao}</p>
                <p>Descrição: {denuncia.descricao}</p>

                <br />

                <h1>Usuário Denunciate</h1>

                <p><b>ID:</b> {usuario.id_usuario}</p>
                <p><b>Dono:</b> {usuario.nome}</p>
                <p><b>E-mail:</b> {usuario.email}</p>
                <p><b>Contatos:</b></p>
                <div>
                    {usuario.contatos.map((contato) => (
                        contato.principal === 1 && (
                            <div key={contato.id_contato}>
                                <p><b>Numero:</b> ({contato.dd}) {contato.numero}</p>
                            </div>
                        )
                    ))}
                </div>
                <p><b>Endereços:</b></p>
                <div>
                    {usuario.enderecos.map((endereco) => (
                        endereco.principal === 1 && (
                            <div key={endereco.id_endereco}>
                                <p><b>CEP:</b>{endereco.cep}</p>
                                <p><b>Bairro:</b>{endereco.bairro}</p>
                                <p><b>Numero:</b>{endereco.numero}</p>
                                <p><b>Complemento:</b>{endereco.complemento}</p>
                            </div>
                        )
                    ))}
                </div>
                <br />

                <h1>Usuário Denunciado</h1>

                <p><b>ID:</b> {usuarioDenunciante.id_usuario}</p>
                <p><b>Dono:</b> {usuarioDenunciante.nome}</p>
                <p><b>E-mail:</b> {usuarioDenunciante.email}</p>
                <p><b>Contatos:</b></p>
                <div>
                    {usuarioDenunciante.contatos.map((contato) => (
                        contato.principal === 1 && (
                            <div key={contato.id_contato}>
                                <p><b>Numero:</b> ({contato.dd}) {contato.numero}</p>
                            </div>
                        )
                    ))}
                </div>
                <p><b>Endereços:</b></p>
                <div>
                    {usuarioDenunciante.enderecos.map((endereco) => (
                        endereco.principal === 1 && (
                            <div key={endereco.id_endereco}>
                                <p><b>CEP:</b>{endereco.cep}</p>
                                <p><b>Bairro:</b>{endereco.bairro}</p>
                                <p><b>Numero:</b>{endereco.numero}</p>
                                <p><b>Complemento:</b>{endereco.complemento}</p>
                            </div>
                        )
                    ))}
                </div>
                <br />

                <h1>Animal</h1>

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

                {children}

                <hr />

            </div>)}
        </>
    )

}

DenunciaDetalhes.propTypes = {
    usuario: PropTypes.shape({
        id_usuario: PropTypes.number.isRequired,
    }).isRequired,
    usuarioDenunciante: PropTypes.shape({
        id_usuario: PropTypes.number.isRequired,
    }).isRequired,
    animal: PropTypes.shape({
        id_animal: PropTypes.number.isRequired,
    }).isRequired,
    children: PropTypes.node.isRequired,
};

export default DenunciaDetalhes;
