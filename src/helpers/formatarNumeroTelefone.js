function formatarNumeroTelefone(telefone) {

    // Remover todos os caracteres não numéricos
    const numeroLimpo = telefone.replace(/\D/g, '');

    // Aplicar a máscara (XX) XXXXX-XXXX
    const telefoneFormatado = `(${numeroLimpo.substring(0, 2)}) ${numeroLimpo.substring(2, 7)}-${numeroLimpo.substring(7)}`;

    return telefoneFormatado;
    
}

export default formatarNumeroTelefone