function formatarCEP(cep) {
    
    // Remover todos os caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Aplicar a máscara XXXXX-XXX
    const cepFormatado = `${cepLimpo.substring(0, 5)}-${cepLimpo.substring(5)}`;

    return cepFormatado;
}

export default formatarCEP
