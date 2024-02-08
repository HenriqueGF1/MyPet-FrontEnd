import React from "react";

function Footer() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-3">
          <div className="p-3">
            <a href="/" className="">
              <span className="text-lg font-bold">MyPet</span>
            </a>
            <p className="break-all">
              Bem-vindo ao MyPet! <br />
              Encontre seu amigo perfeito para adoção aqui.
              <br /> Navegue, escolha e traga amor para casa
            </p>
          </div>

          <div className="p-3">
            <p className="font-bold">Contato</p>
            <p className="">
              Email:
              <a href="mailto:info@lorem.mail" className="p-2">
                goncalves.f.henrique@gmail.com
              </a>
            </p>
            <span className="opacity-65">Me de um feedback</span>
          </div>

          <div className="p-3">
            <p className="font-bold">Social</p>
            <a href="https://github.com/HenriqueGF1" className="mr-1">
              Github
            </a>
            <a href="https://www.linkedin.com/in/henrique-gf" className="">
              Linkedin
            </a>
          </div>
        </div>
        <p className="text-center">© Copyright 2023 HenriqueGF1</p>
      </div>
    </div>
  );
}

export default Footer;
