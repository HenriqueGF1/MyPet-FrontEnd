import AnimalDetalhes from "../../Animais/AnimalDetalhes";
import Loading from "../../Loading/Loading";
import PropTypes from "prop-types";
import formatarCEP from "../../../helpers/formatarCEP";
import formatarNumeroTelefone from "../../../helpers/formatarNumeroTelefone";

function DenunciaDetalhes({
  denuncia,
  usuario,
  usuarioDenunciante,
  animal,
  children,
}) {
  return (
    <>
      {Object.entries(denuncia).length === 0 ||
      Object.entries(usuario).length === 0 ||
      Object.entries(usuarioDenunciante).length === 0 ||
      Object.entries(animal).length === 0 ? (
        <Loading />
      ) : (
        <div>
          <div
            className={`bg-[#FFFFFF] rounded shadow-md w-[80%] p-5 my-5 mx-auto`}
          >
            <div className="w-[100%] flex flex-col lg:flex-row">
              <div className="p-3">
                <h1 className="text-base font-bold my-3">Denúncia</h1>
                <p className="text-sm my-1 mr-1">
                  <b>Tipo: </b>
                  {denuncia.tipo.descricao}
                </p>
                <p className="text-sm my-1 mr-1">
                  <b>Descrição: </b>
                  {denuncia.descricao}
                </p>
              </div>
              <div className="p-3">
                <h1 className="text-base font-bold my-3">Usuário Denunciado</h1>
                <p className="text-sm my-1 mr-1">
                  <b>Nome: </b>
                  {usuario.nome}
                </p>
                <p className="text-sm my-1 mr-1">
                  <b>E-mail: </b>
                  {usuario.email}
                </p>
                <div>
                  {usuario.contatos.map(
                    (contato) =>
                      contato.principal === 1 && (
                        <div key={contato.id_contato}>
                          <p className="text-sm my-1 mr-1">
                            <b>Numero: </b>({contato.dd}) {contato.numero}
                          </p>
                        </div>
                      )
                  )}
                </div>
                <div>
                  {usuario.enderecos.map(
                    (endereco) =>
                      endereco.principal === 1 && (
                        <div key={endereco.id_endereco}>
                          <p className="text-sm my-1 mr-1">
                            <b>Cep: </b>
                            {endereco.cep}
                          </p>
                          <p className="text-sm my-1 mr-1">
                            <b>Bairro: </b>
                            {endereco.bairro}
                          </p>
                          <p className="text-sm my-1 mr-1">
                            <b>Numero: </b>
                            {endereco.numero}
                          </p>
                          <p className="text-sm my-1 mr-1">
                            <b>Complemento: </b>
                            {endereco.complemento}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
              <div className="p-3">
                <h1 className="text-base font-bold my-3">
                  Usuário Denunciante
                </h1>
                <p className="text-sm my-1 mr-1">
                  <b>Nome: </b>
                  {usuarioDenunciante.nome}
                </p>
                <p className="text-sm my-1 mr-1">
                  <b>E-mail: </b>
                  {usuarioDenunciante.email}
                </p>
                <div>
                  {usuarioDenunciante.contatos.map(
                    (contato) =>
                      contato.principal === 1 && (
                        <div key={contato.id_contato}>
                          <p className="text-sm my-1 mr-1">
                            <b>Numero: </b>
                            {formatarNumeroTelefone(
                              contato.dd + contato.numero
                            )}
                          </p>
                        </div>
                      )
                  )}
                </div>
                <div>
                  {usuarioDenunciante.enderecos.map(
                    (endereco) =>
                      endereco.principal === 1 && (
                        <div key={endereco.id_endereco}>
                          <p className="text-sm my-1 mr-1">
                            <b>Cep: </b>
                            {formatarCEP(endereco.cep)}
                          </p>
                          <p className="text-sm my-1 mr-1">
                            <b>Bairro: </b>
                            {endereco.bairro}
                          </p>
                          <p className="text-sm my-1 mr-1">
                            <b>Numero: </b>
                            {endereco.numero}
                          </p>
                          <p className="text-sm my-1 mr-1">
                            <b>Complemento: </b>
                            {endereco.complemento}
                          </p>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>

            <div className="w-[100%]">
              <div className="w-[100%]">
                <AnimalDetalhes animal={animal}></AnimalDetalhes>
              </div>

              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

DenunciaDetalhes.propTypes = {
  denuncia: PropTypes.object.isRequired,
  usuario: PropTypes.object.isRequired,
  usuarioDenunciante: PropTypes.object.isRequired,
  animal: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default DenunciaDetalhes;
