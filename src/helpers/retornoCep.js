import buscarCep from "../services/buscaCep";
import limparNumeros from "./limparNumeros";

const retornoCep = async (cep, bairro, complemento) => {
  let cepCampo = document.querySelector(`#${cep}`);
  let bairroCampo = document.querySelector(`#${bairro}`);
  let complementoCampo = document.querySelector(`#${complemento}`);

  let cepValor = limparNumeros(cepCampo.value);

  if (cepValor.length < 8) {
    return;
  }

  bairroCampo.value = "Carregando...";
  complementoCampo.value = "Carregando...";

  let cepResultado = await buscarCep(cepCampo.value);

  if (cepResultado === undefined) {
    cepCampo.value = null;
    bairroCampo.value = "";
    complementoCampo.value = "";
  }

  return cepResultado;
};

export default retornoCep;
