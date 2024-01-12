const MessageValidation = (label, type) => {
  const mensagem = {
    required: `Esse campo ${label} e obrigatório`,
  };

  return <p className="erro-mensagem">{mensagem[type] || ""}</p>;
};

export default MessageValidation;
