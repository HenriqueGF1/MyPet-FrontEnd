import "react-responsive-carousel/lib/styles/carousel.min.css";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import RespostaDenuncia from "../../pages/Denuncias/RespostaDenuncia";

function AnimaisList({
  animal,
  handleDelete,
  handleAdotado,
  handleDesativar,
  handleAtivar,
  respostaDenuncia,
}) {
  console.log("🚀 ~ animal:", animal);
  const carouselImages = useMemo(() => {
    return animal.fotos.map((foto) => (
      <img
        className="object-cover w-[100%] h-[300px]"
        key={foto.nome_arquivo}
        src={`http://localhost:8000/${foto.url}`}
        alt={foto.nome_arquivo_original}
      />
    ));
  }, [animal.fotos]);

  return (
    <div
      className={` rounded shadow-md ${
        animal.dt_inativacao ? "border-l-8 border-[--color-06]" : "bg-[#FFFFFF]"
      } ${animal.adotado == 1 ? "border-l-8 border-[--color-principal]" : ""} 
         w-[90%] p-3 my-3 mx-auto`}
    >
      <div className="w-[100%] lg:w-[50%] object-cover mr-1 my-2">
        {animal.fotos.length === 0 ? (
          <p className="text-center text-sm">Sem Fotos</p>
        ) : (
          <Carousel
            showThumbs={false}
            infiniteLoop={true}
            autoPlay={true}
            interval={3000}
          >
            {carouselImages}
          </Carousel>
        )}
      </div>

      <div className={`my-3 ${animal.dt_inativacao ? "line-through" : ""}`}>
        <p className="my-3">
          <b>Animal</b>
        </p>
        <span className="text-sm mr-1">
          <b>Nome:</b> {animal.nome}
        </span>
        <span className="text-sm mr-1">
          <b>Idade:</b>{" "}
          {animal.idade > 1 ? animal.idade + " Anos" : " Recém Nascido "}
        </span>
        <span className="text-sm mr-1">
          <b>Sexo:</b> {animal.sexo == "M" ? "Macho" : "Fêmea"}
        </span>
        <span className="text-sm mr-1">
          <b>Categoria:</b> {animal.categoria.descricao}
        </span>
        <span className="text-sm mr-1">
          <b>Porte:</b> {animal.porte.descricao}
        </span>
        <p className="text-sm mr-1">
          <b>Descrição:</b> {animal.descricao}
        </p>
      </div>

      <div className="w-[100%]">
        {respostaDenuncia.length > 0 ? (
          ""
        ) : (
          <>
            {animal.dt_inativacao || animal.adotado == 1 ? (
              ""
            ) : (
              <>
                <Link
                  to={`/animais/editar/${animal.id_animal}`}
                  className="botao btn-group text-white bg-[--color-03] hover:bg-[--color-02]"
                  type="submit"
                >
                  Editar
                </Link>

                <button
                  onClick={() => handleDesativar(animal.id_animal)}
                  className="botao btn-group text-white bg-[--color-05] hover:bg-[--color-02] hover:text-black"
                  type="submit"
                >
                  Desativar
                </button>
              </>
            )}

            {!animal.dt_inativacao ? (
              <button
                onClick={() => handleAdotado(animal.id_animal, animal.adotado)}
                className="botao btn-group text-white bg-[--color-04] hover:bg-[--color-02] hover:text-black"
                type="submit"
              >
                {animal.adotado == 0 ? "Adotar" : "Remover Adoção"}
              </button>
            ) : (
              ""
            )}

            {!animal.dt_inativacao ? (
              ""
            ) : (
              <button
                onClick={() => handleAtivar(animal.id_animal)}
                className="botao btn-group text-black bg-[--color-07] hover:bg-[--color-02]"
                type="submit"
              >
                Ativar
              </button>
            )}

            <button
              onClick={() => handleDelete(animal.id_animal)}
              className="botao btn-group text-white bg-[--color-06] hover:bg-[--color-02] hover:text-black"
              type="submit"
            >
              Deletar
            </button>
          </>
        )}

        {respostaDenuncia.length > 0 ? (
          <RespostaDenuncia respostaDenuncia={respostaDenuncia} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}



export default AnimaisList;
