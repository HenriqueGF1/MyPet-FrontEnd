function limparNumeros(string) {
    // Usa uma expressão regular para remover tudo que não é número
    return string.replace(/\D/g, '');
}

export default limparNumeros