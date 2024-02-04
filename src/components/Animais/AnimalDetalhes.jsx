import "react-responsive-carousel/lib/styles/carousel.min.css";
import Loading from "../Loading/Loading";
import PropTypes from "prop-types";
import formatarCEP from "../../helpers/formatarCEP";
import formatarNumeroTelefone from "../../helpers/formatarNumeroTelefone";
import { Carousel } from "react-responsive-carousel";
import { React } from "react";

function AnimalDetalhes({ animal, children }) {
  return (
    <div className="bg-[#FFFFFF] rounded shadow-md m-3 p-3">
      {animal.length < 1 ? (
        <Loading />
      ) : (
        <>
          <div className="w-[100%] flex flex-col lg:flex-row items-center">
            <div className="w-[100%] p-3 mr-1">
              {animal.fotos.length < 1 ? (
                <p className="text-center text-sm">Sem Fotos</p>
              ) : (
                <>
                  <Carousel
                    showThumbs={false}
                    infiniteLoop={true}
                    autoPlay={true}
                    interval={3000}
                  >
                    {animal.fotos?.map((foto) => {
                      return (
                        <div key={foto.id_foto_animal}>
                          <img
                            className="object-contain"
                            src={`http://localhost:8000/${foto.url}`}
                            alt={foto.nome_arquivo_original}
                          />
                        </div>
                      );
                    })}
                  </Carousel>
                </>
              )}
            </div>

            <div className="w-[100%] p-3">
              <p className="text-sm my-1 mr-1">
                <b>Nome: </b> {animal.nome}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Sexo: </b> {animal.sexo == "M" ? "Macho" : "Fêmea"}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Idade: </b>{" "}
                {animal.idade > 1 ? animal.idade + " Anos" : " Recém Nascido "}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Categoria: </b> {animal.categoria.descricao}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Porte: </b> {animal.porte.descricao}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>Descrição: </b> {animal.descricao}
              </p>
            </div>
          </div>

          <div className="w-[100%] flex flex-col lg:flex-row pl-3">
            <div className="w-[100%] lg:w-[33%]">
              <h1 className="text-lg my-2">Dono</h1>

              <p className="text-sm my-1 mr-1">
                <b>Nome: </b> {animal.usuario.nome}
              </p>
              <p className="text-sm my-1 mr-1">
                <b>E-mail: </b> {animal.usuario.email}
              </p>

              <h1 className="text-lg my-2">Contatos</h1>

              {animal.usuario.contatos.map(
                (contato) =>
                  contato.principal === 1 && (
                    <div key={contato.id_contato}>
                      <p className="text-sm my-1 mr-1">
                        <b>Numero:</b>{" "}
                        {formatarNumeroTelefone(contato.dd + contato.numero)}
                      </p>
                    </div>
                  )
              )}
            </div>

            <div className="w-[100%] lg:w-[33%]">
              <h1 className="text-lg my-2">Endereços</h1>

              {animal.usuario.enderecos.map(
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

          <div className="w-[100%] lg:w-[33%]">{children}</div>
        </>
      )}
    </div>
  );
}

AnimalDetalhes.propTypes = {
  animal: PropTypes.shape({
    idade: PropTypes.number.isRequired,
    sexo: PropTypes.string.isRequired,
    nome: PropTypes.string.isRequired,
    descricao: PropTypes.string.isRequired,
    categoria: PropTypes.shape({
      descricao: PropTypes.string,
    }),
    porte: PropTypes.shape({
      descricao: PropTypes.string,
    }),
    fotos: PropTypes.arrayOf(
      PropTypes.shape({
        id_foto_animal: PropTypes.number,
        url: PropTypes.string,
        nome_arquivo_original: PropTypes.string,
      })
    ).isRequired,
    usuario: PropTypes.shape({
      id_usuario: PropTypes.number,
      nome: PropTypes.string,
      email: PropTypes.string,
      contatos: PropTypes.arrayOf(
        PropTypes.shape({
          id_contato: PropTypes.number,
          dd: PropTypes.string,
          numero: PropTypes.string,
          principal: PropTypes.number,
        })
      ).isRequired,
      enderecos: PropTypes.arrayOf(
        PropTypes.shape({
          id_endereco: PropTypes.number,
          cep: PropTypes.string,
          bairro: PropTypes.string,
          numero: PropTypes.number,
          complemento: PropTypes.string,
          principal: PropTypes.number,
        })
      ).isRequired,
    }).isRequired,
    adotado: PropTypes.number.isRequired,
  }).isRequired,
  children: PropTypes.node,
};

export default AnimalDetalhes;
