import buscarCep from "../services/buscaCep";
import limparNumeros from "./limparNumeros";

const retornoCep = async (cep, bairro, complemento) => {
    
console.log("🚀 ~ file: retornoCep.js:5 ~ retornoCep ~ cep, bairro, complemento:", cep, bairro, complemento)

    let cepCampo = document.querySelector(`#${cep}`).value;
    let bairroCampo = document.querySelector(`#${bairro}`)
    let complementoCampo = document.querySelector(`#${complemento}`)

    let cepValor = limparNumeros(cepCampo)

    bairroCampo.value = '';
    complementoCampo.value = '';

    if (cepValor.length < 8) {
        return
    }

    bairroCampo.value = 'Carregando...'
    complementoCampo.value = 'Carregando...'

    let cepResultado = await buscarCep(cepCampo);

    return cepResultado;
}

export default retornoCep